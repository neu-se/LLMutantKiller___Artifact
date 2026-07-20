// src/core/MutationTestWorker.ts

import path from "path";
import { ChatClient, IChatClient } from "./ChatClient";
import {
  MutationObj,
  CliArgs,
  Category,
  ChatMsg,
  JestResult,
  AttemptResult,
  MetaReportEntry,
} from "../types";
import {
  run_stash_and_checkout,
  compileTemplate,
  buildOrigFileWithPlaceholder,
  extractTestCode,
  runJest,
  joinAbsolute,
  buildArtifactDirPath,
  buildArtifactPaths,
  ArtifactPaths,
  relativeToRoot,
  writeFile,
  deleteDirectoryIfExists,
  toShortMutationId,
  parsePassFailTitlesFromLog,
  isMixedSuite,
  skipTitlesInCode,
  resolveFromRoot,
  templatePath,
  readFileOrJson,
  detectSyntaxErrorInContent,
  parseAllowedExternalLibraries,
  detectForbiddenExternalLibraries,
} from "../utils";

const TEMPLATE_BY_CATEGORY = {
  fail_fail_on_original: "retry_fail_fail_on_original.hb",
  fail_pass_on_mutation: "retry_fail_pass_on_mutation.hb",
  fail_syntax_error: "retry_fail_syntax_error.hb",
  fail_forbidden_libraries: "retry_fail_forbidden_libraries.hb",
} as const;

type RetryCategory = keyof typeof TEMPLATE_BY_CATEGORY;

function toPosix(p: string): string {
  return (p || "").replace(/\\/g, "/");
}

function ensureDotPrefix(rel: string): string {
  if (!rel) return rel;
  return rel.startsWith(".") ? rel : `./${rel}`;
}

export class MutationTestWorker {
  private repoPath: string;
  private modelSlug: string;
  private client!: IChatClient;
  private shortMutationId: string;
  private runStart!: number;
  private chatHistory: ChatMsg[] = [];

  // Track whether last attempt was a "mixed → fail_pass_on_mutation" case,
  // so we can select the special mixed retry template and include mutated log.
  private lastWasMixedForRetry = false;
  private lastMixedMutatedLog: string | null = null;
  private lastSyntaxErrorMessage: string | null = null;
  private lastForbiddenLibrariesMessage: string | null = null;

  // Store the log we want to feed into the next retry prompt (normal case)
  private lastOrigLog: string | null = null;

  // Single source for git lock max-age (user's --timeout seconds)
  private readonly LOCK_MS: number;

  /** Base directory where this worker writes artifacts for this run:
   *   <...>/artifacts/<projectName>
   * Caller decides if this is under outDir or cacheDir.
   */
  private runArtifactBaseDir: string;

  constructor(
    private cfg: CliArgs,
    private runId: string,
    private projectName: string,
    private mutationId: string, // full branch name, e.g., "mutant-<hash>"
    private mutationObj: MutationObj,
    artifactsBaseDir: string
  ) {
    // Prefer explicit projectPath (used by tests), otherwise subjectsDir/<projectName>
    this.repoPath =
      this.cfg.projectPath ?? joinAbsolute(this.cfg.subjectsDir, this.projectName);
    this.modelSlug = this.cfg.model.replace(/\//g, "_");
    this.shortMutationId = toShortMutationId(this.mutationId);
    this.LOCK_MS = this.cfg.timeoutSeconds * 1000;

    // Now injected by the caller (manager / cache handler)
    this.runArtifactBaseDir = artifactsBaseDir;
  }

  /** Runs up to maxAttempts attempts and returns per-attempt results. */
  public async run(): Promise<AttemptResult[]> {
    this.runStart = Date.now();

    // Always do a real run; caching is handled outside this class.
    this.client = new ChatClient(this.cfg.model, this.cfg.temperature, {
      mode: this.cfg.rateLimitMode ?? "adaptive",
      ms: this.cfg.rateLimitMs,
      transportRetries: this.cfg.transportRetries,
    });

    const allowedRaw = await this.getAllowedExternalLibrariesForProject();
    const allowedSet = parseAllowedExternalLibraries(allowedRaw);

    const attemptLogs: AttemptResult[] = [];
    let lastCategory: Category | null = null;
    let lastOrig: JestResult | null = null;

    for (let attempt = 1; attempt <= this.cfg.maxAttempts; attempt++) {
      // Pending dir under this worker's artifact base
      const pendingDir = await buildArtifactDirPath(
        this.runArtifactBaseDir,
        attempt,
        "pending_category",
        this.shortMutationId
      );

      try {
        const pendingPaths = buildArtifactPaths(pendingDir, attempt);

        // --- Generate/Retry code + write prompt_<i>.txt into PENDING dir ---
        const repoRelPath = relativeToRoot(this.repoPath);
        const testCaseRelPath = relativeToRoot(pendingPaths.testCasePath);
        const isInitial = attempt === 1 || this.chatHistory.length === 0;

        let retryCategory: Exclude<Category, "successful"> | undefined = undefined;
        if (!isInitial && lastCategory) {
          retryCategory = lastCategory as Exclude<Category, "successful">;
        }

        let retryLog: string | undefined = undefined;
        if (!isInitial) {
          if (lastCategory === "fail_syntax_error" && this.lastSyntaxErrorMessage) {
            retryLog = this.lastSyntaxErrorMessage;
          } else if (
            lastCategory === "fail_forbidden_libraries" &&
            this.lastForbiddenLibrariesMessage
          ) {
            retryLog = this.lastForbiddenLibrariesMessage;
          } else {
            retryLog =
              this.lastWasMixedForRetry && this.lastMixedMutatedLog
                ? this.lastMixedMutatedLog
                : this.lastOrigLog ?? "";
          }
        }

        const { testCode, userPrompt } = await this.generateTestCode(
          isInitial,
          retryCategory,
          retryLog,
          { repoRelPath, testCaseRelPath }
        );

        await writeFile(pendingPaths.testCasePath, testCode);

        const syntaxMsg = detectSyntaxErrorInContent(testCode, "testCase.test.ts");
        if (syntaxMsg) {
          this.lastSyntaxErrorMessage = syntaxMsg;
          this.lastForbiddenLibrariesMessage = null;
          this.lastOrigLog = syntaxMsg;

          const category: Category = "fail_syntax_error";
          const origResult: JestResult = {
            syntaxError: false,
            passed: false,
            log: syntaxMsg,
          };

          const collectedRelPath = await this.collectArtifacts(
            attempt,
            category,
            testCode,
            userPrompt,
            origResult,
            null
          );

          const attemptResult = this.buildAttemptResult(
            attempt,
            category,
            collectedRelPath
          );
          attemptLogs.push(attemptResult);
          await this.writeMetaForAttempt(attemptResult);

          lastCategory = category;
          lastOrig = origResult;

          continue;
        }

        const forb = detectForbiddenExternalLibraries(testCode, allowedSet);
        if (forb.message) {
          this.lastForbiddenLibrariesMessage = forb.message;
          this.lastSyntaxErrorMessage = null;
          this.lastOrigLog = forb.message;

          const category: Category = "fail_forbidden_libraries";
          const origResult: JestResult = {
            syntaxError: false,
            passed: false,
            log: forb.message,
          };

          const collectedRelPath = await this.collectArtifacts(
            attempt,
            category,
            testCode,
            userPrompt,
            origResult,
            null
          );

          const attemptResult = this.buildAttemptResult(
            attempt,
            category,
            collectedRelPath
          );
          attemptLogs.push(attemptResult);
          await this.writeMetaForAttempt(attemptResult);

          lastCategory = category;
          lastOrig = origResult;

          continue;
        }

        this.lastWasMixedForRetry = false;
        this.lastMixedMutatedLog = null;

        // --- Classify using the test stored in PENDING dir (run on branches) ---
        const {
          category,
          origResult,
          mutantResult,
          finalTestCode,
          wasMixed,
          mixedMutatedLog,
        } = await this.classifyTest(
          pendingPaths,
          attempt,
          pendingDir,
          testCode,
          userPrompt
        );

        // Persist the chosen retry log for the next attempt
        this.lastOrigLog = origResult.log;

        // Store for next retry decision
        if (wasMixed && category === "fail_pass_on_mutation") {
          this.lastWasMixedForRetry = true;
          this.lastMixedMutatedLog = mixedMutatedLog ?? null;
        }

        // --- Persist logs & chat history in the FINAL category dir ---
        const collectedRelPath = await this.collectArtifacts(
          attempt,
          category,
          finalTestCode,
          userPrompt,
          origResult,
          mutantResult
        );

        // --- Record per-attempt outcome ---
        const attemptResult = this.buildAttemptResult(
          attempt,
          category,
          collectedRelPath
        );
        attemptLogs.push(attemptResult);

        // --- Write meta_report.json alongside artifacts (under this worker's base dir) ---
        await this.writeMetaForAttempt(attemptResult);

        if (category === "successful") break; // stop early on success

        lastCategory = category;
        lastOrig = origResult;
      } finally {
        await deleteDirectoryIfExists(pendingDir);
      }
    }

    return attemptLogs;
  }

  // ---------- private helpers ----------

  private buildAttemptResult(
    attempt: number,
    category: Category,
    collectedRelPath: string
  ): AttemptResult {
    const elapsedSeconds = Math.round((Date.now() - this.runStart) / 1000);
    const tokensIn = this.client.getTotalTokensIn();
    const tokensOut = this.client.getTotalTokensOut();
    const promptCacheMetrics = this.client.getPromptCacheMetrics();
    return {
      attempt,
      category,
      elapsedSeconds,
      tokensIn,
      tokensOut,
      ...(promptCacheMetrics ?? {}),
      collectedRelPath,
    };
  }

  private async writeMetaForAttempt(result: AttemptResult): Promise<void> {
    const finalDirAbs = resolveFromRoot(result.collectedRelPath);

    const meta: MetaReportEntry = {
      project: this.projectName,
      mutationShortId: this.shortMutationId,
      attempt: result.attempt,
      category: result.category,
      elapsedSeconds: result.elapsedSeconds,
      tokensIn: result.tokensIn,
      tokensOut: result.tokensOut,
      ...(typeof result.cachedTokens === "number"
        ? { cachedTokens: result.cachedTokens }
        : {}),
      ...(typeof result.cacheWriteTokens === "number"
        ? { cacheWriteTokens: result.cacheWriteTokens }
        : {}),
      ...(typeof result.uncachedTokensIn === "number"
        ? { uncachedTokensIn: result.uncachedTokensIn }
        : {}),
      ...(typeof result.openRouterCost === "number"
        ? { openRouterCost: result.openRouterCost }
        : {}),
      address: result.collectedRelPath,
    };

    await writeFile(joinAbsolute(finalDirAbs, "meta_report.json"), meta);
  }

  private async getExistingTestsForProject(): Promise<string> {
    try {
      const p = templatePath(`subject_tests/${this.projectName}.txt`);
      const raw = await readFileOrJson(p);
      return typeof raw === "string" ? raw : JSON.stringify(raw, null, 2);
    } catch {
      return "(no preexisting test cases were provided)";
    }
  }

  private async getPackageJsonAsString(): Promise<string> {
    try {
      const p = joinAbsolute(this.repoPath, "package.json");
      const raw = await readFileOrJson(p);
      return typeof raw === "string" ? raw : JSON.stringify(raw, null, 2);
    } catch {
      return "{}";
    }
  }

  private async getSystemPrompt(context: Record<string, unknown>): Promise<string> {
    try {
      return await compileTemplate("systemPrompt.hb", context);
    } catch {
      return "";
    }
  }

  private async getAllowedExternalLibrariesForProject(): Promise<string> {
    const candidates = [
      `${this.projectName}.txt`,
      `${this.projectName.replace(/\./g, "")}.txt`,
      `${this.projectName.toLowerCase()}.txt`,
      `${this.projectName.replace(/\./g, "").toLowerCase()}.txt`,
    ];

    for (const fname of candidates) {
      try {
        const p = templatePath(`subject_allowed_libraries/${fname}`);
        const raw = await readFileOrJson(p);
        const s = typeof raw === "string" ? raw : JSON.stringify(raw, null, 2);
        return s.trim().length > 0 ? s : "";
      } catch {}
    }

    return "";
  }

  private computeImportPathToMutatedFile(extra?: {
    repoRelPath: string;
    testCaseRelPath: string;
  }): string {
    const repoRel = toPosix(extra?.repoRelPath ?? relativeToRoot(this.repoPath));
    const testRel = toPosix(extra?.testCaseRelPath ?? "");
    const testDir = path.posix.dirname(testRel);
    const target = path.posix.join(repoRel, toPosix(this.mutationObj.file));
    const rel = path.posix.relative(testDir, target);
    return ensureDotPrefix(rel);
  }

  private async generateTestCode(
    isInitial: boolean,
    category?: Exclude<Category, "successful">,
    log?: string,
    extra?: { repoRelPath: string; testCaseRelPath: string }
  ): Promise<{ testCode: string; userPrompt: string }> {
    let userPrompt: string;

    if (isInitial) {
      const importPathToMutatedFile = this.computeImportPathToMutatedFile(extra);

      if (this.chatHistory.length === 0) {
        const systemPrompt = await this.getSystemPrompt({
          importPathToMutatedFile,
        });
        if (systemPrompt.trim()) {
          this.chatHistory.push({ role: "system", content: systemPrompt });
        }
      }

      const origFileWithPlaceHolder = await buildOrigFileWithPlaceholder(
        this.repoPath,
        this.mutationObj
      );

      const allowedExternalLibraries =
        await this.getAllowedExternalLibrariesForProject();

      // Choose template for the very first prompt
      if (this.cfg.withTests) {
        const [existingTestCases, packageDotJson] = await Promise.all([
          this.getExistingTestsForProject(),
          this.getPackageJsonAsString(),
        ]);

        userPrompt = await compileTemplate("initialPromptWithTestCases.hb", {
          repoRelPath: extra?.repoRelPath ?? relativeToRoot(this.repoPath),
          testCaseRelPath: extra?.testCaseRelPath ?? "",
          mutationId: this.mutationId,
          mutationObj: this.mutationObj,
          origFileWithPlaceHolder,
          existingTestCases,
          packageDotJson,
          allowedExternalLibraries,
          importPathToMutatedFile,
        });
      } else {
        userPrompt = await compileTemplate("initialPrompt.hb", {
          repoRelPath: extra?.repoRelPath ?? relativeToRoot(this.repoPath),
          testCaseRelPath: extra?.testCaseRelPath ?? "",
          mutationId: this.mutationId,
          mutationObj: this.mutationObj,
          origFileWithPlaceHolder,
          allowedExternalLibraries,
          importPathToMutatedFile,
        });
      }
    } else {
      // Special-case: mixed → fail_pass_on_mutation uses the mixed template (includes mutated log)
      const useMixedRetry =
        category === "fail_pass_on_mutation" && this.lastWasMixedForRetry;
      if (useMixedRetry) {
        userPrompt = await compileTemplate(
          "retry_mixed_fail_pass_on_mutation.hb",
          {
            errorLog: log ?? "",
          }
        );
      } else {
        const tpl = TEMPLATE_BY_CATEGORY[category as RetryCategory];
        if (category === "fail_syntax_error" || category === "fail_forbidden_libraries") {
          userPrompt = await compileTemplate(tpl, { errorMessage: log ?? "" });
        } else {
          userPrompt = await compileTemplate(tpl, { errorLog: log ?? "" });
        }
      }
    }

    this.chatHistory.push({ role: "user", content: userPrompt });
    const assistantReply = await this.client.send(this.chatHistory);
    this.chatHistory.push({ role: "assistant", content: assistantReply });

    const code = extractTestCode(assistantReply);
    return { testCode: code, userPrompt };
  }

  /** Run an existing test file (already written) on given branch. */
  private async runTestOnBranch(
    branch: string,
    testCasePath: string
  ): Promise<JestResult> {
    await run_stash_and_checkout(this.repoPath, branch, true, this.LOCK_MS);
    return runJest(this.repoPath, testCasePath, { quiet: true, noColor: true });
  }

  /**
   * Decide category; if the original run fails and is a *mixed* suite,
   * split into failing-only (archive) and passing-only (determine final category).
   */
  private async classifyTest(
    artifactPaths: Pick<ArtifactPaths, "testCasePath" | "chatHistoryPath">,
    attempt: number,
    pendingDir: string,
    initialTestCode: string,
    userPrompt: string
  ): Promise<{
    category: Category;
    origResult: JestResult;
    mutantResult: JestResult | null;
    finalTestCode: string;
    wasMixed?: boolean;
    mixedMutatedLog?: string;
  }> {
    // Run on main with the test already written
    const origResult = await this.runTestOnBranch(
      "main",
      artifactPaths.testCasePath
    );

    if (origResult.passed) {
      const mutantResult = await this.runTestOnBranch(
        this.mutationId,
        artifactPaths.testCasePath
      );
      const category: Category = mutantResult.passed
        ? "fail_pass_on_mutation"
        : "successful";
      return {
        category,
        origResult,
        mutantResult,
        finalTestCode: initialTestCode,
      };
    }

    // Failed on main → possibly mixed
    const { passed, failed } = parsePassFailTitlesFromLog(origResult.log);

    // Not mixed: ordinary fail on original
    if (!isMixedSuite(passed, failed)) {
      return {
        category: "fail_fail_on_original",
        origResult,
        mutantResult: null,
        finalTestCode: initialTestCode,
      };
    } else {
      const failingOnly = skipTitlesInCode(initialTestCode, new Set(passed));
      // Archive failing-only under fail_fail_on_original (persist).
      const splitFailPath = joinAbsolute(pendingDir, "split_fail_only.test.ts");
      await writeFile(splitFailPath, failingOnly);
      const failMainRes = await this.runTestOnBranch("main", splitFailPath);

      // Archive in this worker's artifact base
      const archiveFailDir = await buildArtifactDirPath(
        this.runArtifactBaseDir,
        attempt,
        "fail_fail_on_original",
        this.shortMutationId
      );
      const archiveFailPaths = buildArtifactPaths(archiveFailDir, attempt);
      await writeFile(archiveFailPaths.promptPath, userPrompt);
      await writeFile(archiveFailPaths.testCasePath, failingOnly);
      await writeFile(archiveFailPaths.chatHistoryPath, this.chatHistory);
      await writeFile(archiveFailPaths.mainLogPath, failMainRes.log);

      // Passing-only decides the attempt category
      const passingOnly = skipTitlesInCode(initialTestCode, new Set(failed));
      const splitPassPath = joinAbsolute(pendingDir, "split_pass_only.test.ts");
      await writeFile(splitPassPath, passingOnly);
      const passMainRes = await this.runTestOnBranch("main", splitPassPath);
      const mutRes = await this.runTestOnBranch(this.mutationId, splitPassPath);

      const finalCategory: Category = mutRes.passed
        ? "fail_pass_on_mutation"
        : "successful";
      // lets next attempt use retry_mixed_fail_pass_on_mutation.hb
      return {
        category: finalCategory,
        origResult: passMainRes,
        mutantResult: mutRes,
        finalTestCode: passingOnly,
        wasMixed: true,
        mixedMutatedLog: mutRes.log,
      };
    }
  }

  /**
   * Persist user's compiled prompt, main and mutated logs, chat history, and test case
   * under:
   *   <artifactsBaseDir>/attempt_<i>/<category>/<shortMutantId>/
   */
  private async collectArtifacts(
    attempt: number,
    category: Category,
    testCode: string,
    userPrompt: string,
    origResult: JestResult,
    mutantResult: JestResult | null
  ): Promise<string> {
    // 1) Create final category dir and build file paths in the run's outDir
    const finalDir = await buildArtifactDirPath(
      this.runArtifactBaseDir,
      attempt,
      category,
      this.shortMutationId
    );
    const paths = buildArtifactPaths(finalDir, attempt);

    // 2) Write all artifacts directly to the FINAL dir (run artifacts)
    await writeFile(paths.promptPath, userPrompt);
    await writeFile(paths.testCasePath, testCode);
    await writeFile(paths.chatHistoryPath, this.chatHistory);
    await writeFile(paths.mainLogPath, origResult.log);
    if (mutantResult) {
      await writeFile(paths.mutatedLogPath, mutantResult.log);
    }

    return relativeToRoot(finalDir);
  }
}
