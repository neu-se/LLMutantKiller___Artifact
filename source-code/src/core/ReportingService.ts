// src/core/ReportingService.ts

import path from "path";
import {
  Report,
  ProjectReport,
  MutationsMapEntries,
  MutationsMap,
  MetaReportEntry,
} from "../types";
import {
  DefaultMap,
  createProjectReport,
  createAttemptLabel,
  summarizeReport,
  writeSummaryCSV,
  toPlainTextTable,
  printSummaryTableToConsole,
  writePerAttemptCSVs,
  resolveFromRoot,
  createDirectoryIfMissing,
  writeFile,
  readFileOrJson,
  directoryExists,
  listSubdirectories,
  pathExists,
  joinAbsolute
} from "../utils";

export class ReportingService {
  private reportsBase: string;
  private reportPath: string;
  private summaryCsvPath: string;
  private tableTxtPath: string;
  private artifactsRoot: string;
  private errorsJsonPath: string;

  constructor(
    private outDir: string,
    private modelSlug: string,
    private runId: string
  ) {
    const base = resolveFromRoot(this.outDir, this.modelSlug, this.runId);

    this.artifactsRoot  = joinAbsolute(base, "artifacts");
    this.reportsBase    = joinAbsolute(base, "reports");
    this.reportPath     = joinAbsolute(this.reportsBase, "report.json");
    this.summaryCsvPath = joinAbsolute(this.reportsBase, "summary.csv");
    this.tableTxtPath   = joinAbsolute(this.reportsBase, "summary.txt");
    this.errorsJsonPath = joinAbsolute(this.reportsBase, "errors.json");
  }

  public getReportsBase() {
    return this.reportsBase;
  }

  /**
   * Initialize errors.json under reportsBase with an empty list for each project.
   * Shape: { [projectName]: string[] }
   */
  public async initErrors(projects: MutationsMapEntries): Promise<void> {
    const initial: Record<string, string[]> = {};
    for (const [projectName] of projects) {
      initial[projectName] = [];
    }
    await createDirectoryIfMissing(this.reportsBase);
    await writeFile(this.errorsJsonPath, initial);
  }

  /**
   * Record an error for a given mutation by appending to errors.json.
   * Final error messages look like:
   *   "mutant-xxxx: Error: <message>"
   */
  public async recordError(
    project: string,
    mutationShortId: string,
    err: unknown
  ): Promise<void> {
    const msg =
      err instanceof Error
        ? `${mutationShortId}: ${err.name}: ${err.message}`
        : `${mutationShortId}: ${String(err)}`;

    let data: Record<string, string[]> = {};

    if (await pathExists(this.errorsJsonPath)) {
      data = (await readFileOrJson(this.errorsJsonPath)) as Record<string, string[]>;
    }

    if (!data[project]) {
      data[project] = [];
    }
    data[project].push(msg);

    await writeFile(this.errorsJsonPath, data);
  }

  /** Collect all per-attempt meta entries by scanning meta_report.json files. */
  private async collectMetaEntries(): Promise<MetaReportEntry[]> {
    const out: MetaReportEntry[] = [];
    if (!(await directoryExists(this.artifactsRoot))) return out;

    const projects = await listSubdirectories(this.artifactsRoot);
    for (const project of projects) {
      const projectDir = path.join(this.artifactsRoot, project);
      const attemptDirs = await listSubdirectories(projectDir); // attempt_1, attempt_2, ...

      for (const att of attemptDirs) {
        const attDir = path.join(projectDir, att);
        const categoryDirs = await listSubdirectories(attDir);

        for (const cat of categoryDirs) {
          const catDir = path.join(attDir, cat);
          const mutantDirs = await listSubdirectories(catDir);

          for (const shortId of mutantDirs) {
            const metaPath = path.join(catDir, shortId, "meta_report.json");
            if (!(await pathExists(metaPath))) continue;

            const raw = await readFileOrJson(metaPath);
            if (!raw || typeof raw !== "object") continue;

            const e = raw as MetaReportEntry;
            // Minimal sanity checks
            if (
              !e.project || typeof e.project !== "string" ||
              !e.mutationShortId || typeof e.mutationShortId !== "string"
            ) {
              continue;
            }
            out.push(e);
          }
        }
      }
    }

    return out;
  }

  /**
   * Build an in-memory Report purely from meta:
   * - Attempt buckets from meta_report.json files.
   * - Errors from errors.json under reportsBase.
   */
  private async buildReportFromMeta(
    survivingMap: MutationsMap
  ): Promise<Report> {
    const report: Report = new DefaultMap<string, ProjectReport>(createProjectReport);

    // Ensure all projects from survivingMap are present, even if they have no meta/errors.
    for (const projectName of Object.keys(survivingMap)) {
      report.get(projectName);
    }

    // 1) Fill attempts from meta_report.json
    const metaEntries = await this.collectMetaEntries();
    for (const m of metaEntries) {
      const project = m.project;
      const proj = report.get(project);
      const attemptLabel = createAttemptLabel(m.attempt);
      const attemptBucket = proj.attempts.get(attemptLabel);
      const categoryBucket = attemptBucket.get(m.category);

      categoryBucket[m.mutationShortId] = {
        time: m.elapsedSeconds,
        tokensIn: m.tokensIn,
        tokensOut: m.tokensOut,
        ...(typeof m.cachedTokens === "number"
          ? { cachedTokens: m.cachedTokens }
          : {}),
        ...(typeof m.cacheWriteTokens === "number"
          ? { cacheWriteTokens: m.cacheWriteTokens }
          : {}),
        ...(typeof m.uncachedTokensIn === "number"
          ? { uncachedTokensIn: m.uncachedTokensIn }
          : {}),
        ...(typeof m.openRouterCost === "number"
          ? { openRouterCost: m.openRouterCost }
          : {}),
        address: m.address,
      };
    }

    // 2) Attach errors from errors.json (if present)
    if (await pathExists(this.errorsJsonPath)) {
      const raw = await readFileOrJson(this.errorsJsonPath);
      if (raw && typeof raw === "object" && !Array.isArray(raw)) {
        const byProject = raw as Record<string, unknown>;
        for (const [project, value] of Object.entries(byProject)) {
          if (!Array.isArray(value)) continue;
          const proj = report.get(project);
          proj.errors.push(...value.map(String));
        }
      }
    }

    return report;
  }

  /**
   * Main entry: build report.json, summary.csv, summary.txt, and per-attempt CSVs.
   * All of these are computed *only* from meta files on disk.
   */
  public async writeReports(
    projects: MutationsMapEntries,
    maxAttempts: number
  ): Promise<void> {
    const survivingMap: MutationsMap = Object.fromEntries(projects);

    const report = await this.buildReportFromMeta(survivingMap);

    // Ensure reports directory exists
    await createDirectoryIfMissing(this.reportsBase);

    // Write report.json (meta-derived)
    await writeFile(this.reportPath, report);

    // Summary CSV and TXT
    const { headers, rows } = summarizeReport(report, survivingMap, maxAttempts);
    await writeSummaryCSV(this.summaryCsvPath, headers, rows);

    const tableTxt = toPlainTextTable(headers, rows);
    await writeFile(this.tableTxtPath, tableTxt);

    // Per-attempt CSVs
    await writePerAttemptCSVs(this.reportsBase, report, survivingMap, maxAttempts);

    // Extra clarity: print the exact files written
    console.log(
      [
        "",
        `Report JSON:        ${this.reportPath}`,
        `Summary CSV:        ${this.summaryCsvPath}`,
        `Summary TXT table:  ${this.tableTxtPath}`,
        `Per-attempt CSVs in: ${this.reportsBase}`,
      ].join("\n")
    );

    printSummaryTableToConsole(headers, rows);
    console.log(`\nAll reports written to: ${this.reportsBase}`);
  }
}
