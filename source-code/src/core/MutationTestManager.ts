// src/core/MutationTestManager.ts

import { MutationTestWorker } from "./MutationTestWorker";
import { ReportingService } from "./ReportingService";
import { MutationCacheHandler } from "./MutationCacheHandler";
import {
  CliArgs,
  MutationsMapEntries,
  AttemptResult,
} from "../types";
import {
  toShortMutationId,
  runWithTimeout,
  timestampNow,
  buildArtifactsBase,
} from "../utils";

export class MutationTestManager {
  private modelSlug: string;
  private runId: string;
  private timeoutMs: number;
  private reporter: ReportingService;

  constructor(private cfg: CliArgs) {
    this.modelSlug = this.cfg.model.replace(/\//g, "_");
    // Each orchestrator run gets its own timestamped runId (even when caching=true).
    this.runId = timestampNow();
    this.timeoutMs = this.cfg.maxAttempts * this.cfg.timeoutSeconds * 1000;

    // Reporting service: generates reports under effectiveOutDir
    this.reporter = new ReportingService(
      this.cfg.effectiveOutDir,
      this.getModelPathSegment(),
      this.runId
    );
  }

  private getTestStatus(): "withTests" | "withoutTests" {
    return this.cfg.withTests ? "withTests" : "withoutTests";
  }

  private getModelPathSegment(): string {
    // <modelSlug>/temp_<temperature>/<testStatus>
    return `${this.modelSlug}/temp_${this.cfg.temperature}/${this.getTestStatus()}`;
  }

  public getReportsBase() {
    return this.reporter.getReportsBase();
  }

  // ---------- Single-mutation mode (self-contained) ----------
  public async runSingleMutation(
    projectName: string,
    mutationId: string,
    mutationObj: any
  ): Promise<AttemptResult[]> {
    const shortId = toShortMutationId(mutationId);
    const singleEntry: MutationsMapEntries = [
      [projectName, { [mutationId]: mutationObj }],
    ];

    // For CLI single-mutation mode, initialize errors.json for this project.
    if (this.cfg.mutationId) {
      await this.reporter.initErrors(singleEntry);
    }

    let results: AttemptResult[] = [];

    try {
      if (this.cfg.caching) {
        // Caching mode: delegate to cache handler (which uses worker + cacheDir)
        const cacheHandler = new MutationCacheHandler(
          this.cfg,
          this.getModelPathSegment(),
          this.runId
        );

        results = await runWithTimeout(
          () => cacheHandler.run(projectName, mutationId, mutationObj),
          this.timeoutMs,
          `${projectName}:${shortId}`
        );
      } else {
        // Non-caching mode: worker writes directly into outDir-based artifacts tree
        const artifactsBaseDir = buildArtifactsBase(
          this.cfg.effectiveOutDir,
          this.getModelPathSegment(),
          this.runId,
          projectName
        );

        const worker = new MutationTestWorker(
          this.cfg,
          this.runId,
          projectName,
          mutationId,
          mutationObj,
          artifactsBaseDir
        );

        results = await runWithTimeout(
          () => worker.run(),
          this.timeoutMs,
          `${projectName}:${shortId}`
        );
      }

      if (results.length > 0) {
        const final = results[results.length - 1];
        console.log(
          `${projectName} :: ${shortId} -> ${final.category} in ${results.length} attempt(s), ${final.elapsedSeconds}s`
        );
      } else {
        console.log(`${projectName} :: ${shortId} -> no results recorded`);
      }

      return results;
    } catch (err) {
      if (this.cfg.mutationId) {
        console.error(
          `ERROR ${projectName} :: ${shortId} -> ${
            err instanceof Error ? err.message : String(err)
          }`
        );
        // Single-mutation CLI mode: record error into errors.json
        await this.reporter.recordError(projectName, shortId, err);
      }
      throw err; // policy handled by caller
    } finally {
      // Single-mutation mode → always emit artifacts (success or error)
      if (this.cfg.mutationId) {
        await this.reporter.writeReports(singleEntry, this.cfg.maxAttempts);
      }
    }
  }

  // ---------- Run all mutations for a single project ----------
  public async runSingleProject(
    projectName: string,
    mutations: Record<string, any>
  ): Promise<void> {
    for (const [mutationId, mutationObj] of Object.entries(mutations)) {
      const shortId = toShortMutationId(mutationId);
      try {
        await this.runSingleMutation(projectName, mutationId, mutationObj);
      } catch (err) {
        const msg =
          err instanceof Error ? `${err.name}: ${err.message}` : String(err);
        console.error(`ERROR ${projectName} :: ${shortId} -> ${msg}`);
        // Multi-project mode: record error into errors.json
        await this.reporter.recordError(projectName, shortId, err);
        continue;
      }
    }
  }

  // ---------- Multi-project ----------
  public async runAll(projects: MutationsMapEntries): Promise<void> {
    // Initialize errors.json with an empty list for each project
    await this.reporter.initErrors(projects);

    for (const [projectName, mutations] of projects) {
      await this.runSingleProject(projectName, mutations);
    }
    await this.reporter.writeReports(projects, this.cfg.maxAttempts);
  }
}