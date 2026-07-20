// src/core/MutationCacheHandler.ts
import { MutationTestWorker } from "./MutationTestWorker";
import {
  CliArgs,
  MutationObj,
  AttemptResult,
  Category,
  MetaReportEntry,
} from "../types";
import {
  buildArtifactsBase,
  buildArtifactDirPath,
  relativeToRoot,
  resolveFromRoot,
  copyDirectoryRecursive,
  directoryExists,
  pathExists,
  readFileOrJson,
  toShortMutationId,
  writeFile,
  joinAbsolute
} from "../utils";

export class MutationCacheHandler {
  constructor(
    private cfg: CliArgs,
    private modelSlug: string,
    private runId: string
  ) {}

  private static readonly PRIMARY_CACHE_ORDER: ReadonlyArray<Category> = [
    "fail_syntax_error",
    "fail_forbidden_libraries",
    "successful",
    "fail_pass_on_mutation",
  ];

  private async findCachedAttempts(
    projectName: string,
    mutationId: string
  ): Promise<
    Array<{
      attempt: number;
      category: Category;
      cacheDir: string;
      elapsedSeconds: number;
      tokensIn: number;
      tokensOut: number;
      cachedTokens?: number;
      cacheWriteTokens?: number;
      uncachedTokensIn?: number;
      openRouterCost?: number;
    }>
  > {
    const shortId = toShortMutationId(mutationId);
    const cacheBase = buildArtifactsBase(
      this.cfg.cacheDir,
      this.modelSlug,
      "cached",
      projectName
    );

    const hits: Array<{
      attempt: number;
      category: Category;
      cacheDir: string;
      elapsedSeconds: number;
      tokensIn: number;
      tokensOut: number;
      cachedTokens?: number;
      cacheWriteTokens?: number;
      uncachedTokensIn?: number;
      openRouterCost?: number;
    }> = [];

    for (let attempt = 1; attempt <= this.cfg.maxAttempts; attempt++) {
      const attemptDir = joinAbsolute(cacheBase, `attempt_${attempt}`);

      let chosen: { category: Category; dir: string } | null = null;

      // Prefer a single "final" category
      for (const cat of MutationCacheHandler.PRIMARY_CACHE_ORDER) {
        const dir = joinAbsolute(attemptDir, cat, shortId);
        if (await directoryExists(dir)) {
          chosen = { category: cat, dir };
          break;
        }
      }

      // Fallback to fail_fail_on_original if no finals exist
      if (!chosen) {
        const ffDir = joinAbsolute(
          attemptDir,
          "fail_fail_on_original",
          shortId
        );
        if (await directoryExists(ffDir)) {
          chosen = { category: "fail_fail_on_original", dir: ffDir };
        }
      }

      if (!chosen) continue;

      const { category, dir } = chosen;

      // Defaults in case of legacy cache without meta
      let elapsedSeconds = 0;
      let tokensIn = 0;
      let tokensOut = 0;
      let cachedTokens: number | undefined;
      let cacheWriteTokens: number | undefined;
      let uncachedTokensIn: number | undefined;
      let openRouterCost: number | undefined;

      const metaPath = joinAbsolute(dir, "meta_report.json");
      if (await pathExists(metaPath)) {
        try {
          const raw = await readFileOrJson(metaPath);
          if (raw && typeof raw === "object") {
            const meta = raw as MetaReportEntry;
            if (typeof meta.elapsedSeconds === "number") {
              elapsedSeconds = meta.elapsedSeconds;
            }
            if (typeof meta.tokensIn === "number") {
              tokensIn = meta.tokensIn;
            }
            if (typeof meta.tokensOut === "number") {
              tokensOut = meta.tokensOut;
            }
            if (typeof meta.cachedTokens === "number") {
              cachedTokens = meta.cachedTokens;
            }
            if (typeof meta.cacheWriteTokens === "number") {
              cacheWriteTokens = meta.cacheWriteTokens;
            }
            if (typeof meta.uncachedTokensIn === "number") {
              uncachedTokensIn = meta.uncachedTokensIn;
            }
            if (typeof meta.openRouterCost === "number") {
              openRouterCost = meta.openRouterCost;
            }
          }
        } catch {
          // ignore malformed meta, keep zeros
        }
      }

      hits.push({
        attempt,
        category,
        cacheDir: dir,
        elapsedSeconds,
        tokensIn,
        tokensOut,
        ...(typeof cachedTokens === "number" ? { cachedTokens } : {}),
        ...(typeof cacheWriteTokens === "number" ? { cacheWriteTokens } : {}),
        ...(typeof uncachedTokensIn === "number" ? { uncachedTokensIn } : {}),
        ...(typeof openRouterCost === "number" ? { openRouterCost } : {}),
      });
    }

    return hits; // empty → treat as cache miss
  }

  private async writeRunMeta(
    projectName: string,
    shortId: string,
    result: AttemptResult
  ): Promise<void> {
    const finalDirAbs = resolveFromRoot(result.collectedRelPath);
    const meta: MetaReportEntry = {
      project: projectName,
      mutationShortId: shortId,
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

  /**
   * Main entry:
   *  1) If cache hit → copy artifacts from cache to outDir and synthesize AttemptResult[].
   *  2) If miss → run worker into cacheDir, then copy artifacts to outDir and build AttemptResult[].
   */
  async run(
    projectName: string,
    mutationId: string,
    mutationObj: MutationObj
  ): Promise<AttemptResult[]> {
    const shortId = toShortMutationId(mutationId);

    const runArtifactsBaseDir = buildArtifactsBase(
      this.cfg.effectiveOutDir,
      this.modelSlug,
      this.runId,
      projectName
    );

    // ---- Phase 1: cache hit? ----
    const cached = await this.findCachedAttempts(projectName, mutationId);
    if (cached.length > 0) {
      const results: AttemptResult[] = [];

      for (const hit of cached) {
        const runDir = await buildArtifactDirPath(
          runArtifactsBaseDir,
          hit.attempt,
          hit.category,
          shortId
        );

        // Copy cached artifacts into this run's outDir tree
        await copyDirectoryRecursive(hit.cacheDir, runDir);

        const relRun = relativeToRoot(runDir);
        const result: AttemptResult = {
          attempt: hit.attempt,
          category: hit.category,
          elapsedSeconds: hit.elapsedSeconds,
          tokensIn: hit.tokensIn,
          tokensOut: hit.tokensOut,
          ...(typeof hit.cachedTokens === "number"
            ? { cachedTokens: hit.cachedTokens }
            : {}),
          ...(typeof hit.cacheWriteTokens === "number"
            ? { cacheWriteTokens: hit.cacheWriteTokens }
            : {}),
          ...(typeof hit.uncachedTokensIn === "number"
            ? { uncachedTokensIn: hit.uncachedTokensIn }
            : {}),
          ...(typeof hit.openRouterCost === "number"
            ? { openRouterCost: hit.openRouterCost }
            : {}),
          collectedRelPath: relRun,
        };

        results.push(result);
        await this.writeRunMeta(projectName, shortId, result);
      }

      return results;
    }

    // ---- Phase 2: cache miss → run worker into cacheDir ----
    const cacheArtifactsBaseDir = buildArtifactsBase(
      this.cfg.cacheDir,
      this.modelSlug,
      "cached",
      projectName
    );

    const worker = new MutationTestWorker(
      this.cfg,
      this.runId,
      projectName,
      mutationId,
      mutationObj,
      cacheArtifactsBaseDir
    );

    const workerResults = await worker.run();

    // ---- Phase 3: copy from cache -> outDir and write meta for outDir ----
    const finalResults: AttemptResult[] = [];

    for (const res of workerResults) {
      const cacheDir = resolveFromRoot(res.collectedRelPath);

      const runDir = await buildArtifactDirPath(
        runArtifactsBaseDir,
        res.attempt,
        res.category,
        shortId
      );

      await copyDirectoryRecursive(cacheDir, runDir);

      const relRun = relativeToRoot(runDir);
      const adjusted: AttemptResult = {
        ...res,
        collectedRelPath: relRun,
      };

      finalResults.push(adjusted);
      await this.writeRunMeta(projectName, shortId, adjusted);
    }

    return finalResults;
  }
}
