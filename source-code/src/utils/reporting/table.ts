// src/utils/reporting/table.ts

import path from "path";
import { stringify } from "csv-stringify/sync";
import { 
  Report,
  ProjectReport,
  MutationsMap,
  AttemptLabel,
  MutationEntry,
} from "../../types";
import { 
  CATEGORY_ORDER,
  writeFile,
} from "../";

/* =========================
   CSV + Console Writers
   ========================= */

/** Write summary CSV file to disk. */
export async function writeSummaryCSV(
  csvPath: string,
  headers: string[],
  rows: Array<(string | number | "")[]>
) {
  const csv = stringify([headers, ...rows], {
    header: false,
    quoted_match: /\r|\n|,|"/,
  });
  await writeFile(csvPath, csv);
}

/** Build a plain-text table that visually matches console.table (pipes & borders). */
export function toPlainTextTable(
  headers: string[],
  rows: Array<(string | number | "")[]>
): string {
  // column widths = max of header vs each cell in that column
  const colWidths = headers.map((h, i) =>
    Math.max(
      String(h).length,
      ...rows.map(r => String(r[i] ?? "").length)
    )
  );

  const pad = (s: string, w: number) => s + " ".repeat(Math.max(0, w - s.length));

  const border = "+" + colWidths.map(w => "-".repeat(w + 2)).join("+") + "+";
  const header = "|" + headers.map((h, i) => " " + pad(String(h), colWidths[i]) + " ").join("|") + "|";
  const headerSep = "+" + colWidths.map(w => "=".repeat(w + 2)).join("+") + "+";

  const body = rows
    .map(r => "|" + r.map((v, i) => " " + pad(String(v ?? ""), colWidths[i]) + " ").join("|") + "|")
    .join("\n");

  return [border, header, headerSep, body, border].join("\n") + "\n";
}

/** Print summary in a console.table for quick inspection. */
export function printSummaryTableToConsole(
  headers: string[],
  rows: Array<(string | number | "")[]>
) {
  const objects = rows.map((r) => {
    const o: Record<string, string | number | ""> = {};
    headers.forEach((h, i) => (o[h] = r[i]));
    return o;
  });
  console.table(objects);
}

/* =========================
   Summarization Helpers
   ========================= */

function fmt2(n: number | ""): string {
  if (n === "") return "";
  const x = Number(n);
  return Number.isFinite(x) ? x.toFixed(2) : "";
}

function fmtCost(n: number | ""): string {
  if (n === "") return "";
  const x = Number(n);
  return Number.isFinite(x) ? x.toFixed(6) : "";
}

function makeAttemptLabel(i: number): AttemptLabel {
  return `attempt_${i}` as AttemptLabel;
}

function attemptLabels(maxAttempts: number): AttemptLabel[] {
  return Array.from({ length: maxAttempts }, (_, i) => makeAttemptLabel(i + 1));
}

function parseAttemptNumber(label: AttemptLabel): number {
  return Number(label.split("_")[1]) || 0;
}

function hasCacheMetrics(entry: MutationEntry): boolean {
  return (
    typeof entry.cachedTokens === "number" ||
    typeof entry.cacheWriteTokens === "number" ||
    typeof entry.uncachedTokensIn === "number" ||
    typeof entry.openRouterCost === "number"
  );
}

function reportHasCacheMetrics(report: Report): boolean {
  for (const proj of report.values()) {
    for (const attempt of proj.attempts.values()) {
      for (const cat of CATEGORY_ORDER) {
        if (Object.values(attempt.get(cat)).some(hasCacheMetrics)) {
          return true;
        }
      }
    }
  }
  return false;
}

function uniqMutants(proj: ProjectReport): Set<string> {
  const s = new Set<string>();
  for (const a of proj.attempts.values()) {
    for (const c of CATEGORY_ORDER) {
      const dict = a.get(c);
      for (const id of Object.keys(dict)) s.add(id);
    }
  }
  return s;
}

function lastAttemptLabel(proj: ProjectReport): AttemptLabel {
  const labels = Array.from(proj.attempts.keys()) as AttemptLabel[];
  labels.sort((a, b) => parseAttemptNumber(a) - parseAttemptNumber(b));
  return labels[labels.length - 1];
}

/** Build headers for summary table/CSV. */
export function buildSummaryHeaders(
  maxAttempts: number,
  includeCacheMetrics = false
): string[] {
  const headers: string[] = ["Project Name", "#Tested mutants"];
  for (let i = 1; i <= maxAttempts; i++) {
    headers.push(`attempt_${i}.successful`);
  }
  headers.push(
    "total successes",
    "fail_syntax_error",
    "fail_forbidden_libraries",
    "fail_fail_on_original",
    "fail_pass_on_mutation",
    "time",
    "tokens_in"
  );
  if (includeCacheMetrics) {
    headers.push(
      "uncached_tokens_in",
      "cache_write_tokens",
      "cached_tokens",
      "openrouter_cost"
    );
  }
  headers.push("tokens_out");
  return headers;
}

/* ===== attempt_k.csv writer =====
   Columns:
   Project Name,#Tested mutants,successful,fail_syntax_error,fail_fail_on_original,fail_pass_on_mutation,average time,average tokens_in,average tokens_out

   The "Total" row uses WEIGHTED AVERAGES for the last three columns,
   weighted by survivors entering the attempt in each project.
*/
export async function writePerAttemptCSVs(
  outDir: string,
  report: Report,
  survivingMap: MutationsMap,
  maxAttempts: number
): Promise<void> {
  const labels = attemptLabels(maxAttempts);
  const includeCacheMetrics = reportHasCacheMetrics(report);

  for (const att of labels) {
    const header = [
      "Project Name",
      "#Tested mutants",
      "successful",
      "fail_syntax_error",
      "fail_forbidden_libraries",
      "fail_fail_on_original",
      "fail_pass_on_mutation",
      "average time",
      "average tokens_in",
      ...(includeCacheMetrics
        ? [
            "average uncached_tokens_in",
            "average cache_write_tokens",
            "average cached_tokens",
            "average openrouter_cost",
          ]
        : []),
      "average tokens_out",
    ];
    const rows: (string | number)[][] = [header];

    // accumulators for the Total row (weighted averages for averages)
    let totalSurvivors = 0;
    let totalSucc = 0,
      totalFSyn = 0,
      totalFForb = 0,
      totalFOrig = 0,
      totalFPass = 0;

    let weightedTime = 0,
      weightedIn = 0,
      weightedOut = 0,
      weightedUncachedIn = 0,
      weightedCacheWrite = 0,
      weightedCached = 0,
      weightedOpenRouterCost = 0;

    // denominators for weighted averages (exclude projects with no entries)
    let denomTime = 0,
      denomIn = 0,
      denomOut = 0,
      denomUncachedIn = 0,
      denomCacheWrite = 0,
      denomCached = 0,
      denomOpenRouterCost = 0;

    for (const [project, proj] of report) {
      const totalMutants = Object.keys(survivingMap[project] || {}).length;

      // survivors entering this attempt = total - successes from prior attempts
      const attNum = parseAttemptNumber(att);
      let succBefore = 0;
      for (let i = 1; i < attNum; i++) {
        const lab = makeAttemptLabel(i);
        const succ = Object.keys(proj.attempts.get(lab).get("successful")).length;
        succBefore += succ;
      }
      const survivors = totalMutants - succBefore;

      const bucket = proj.attempts.get(att);
      const cSucc = Object.keys(bucket.get("successful")).length;
      const cFSyn = Object.keys(bucket.get("fail_syntax_error")).length;
      const cFForb = Object.keys(bucket.get("fail_forbidden_libraries")).length;
      const cFOrig = Object.keys(bucket.get("fail_fail_on_original")).length;
      const cFPass = Object.keys(bucket.get("fail_pass_on_mutation")).length;

      // per-project averages for this attempt across entries (all categories)
      const entries = CATEGORY_ORDER.flatMap((cat) => Object.values(bucket.get(cat)));
      const avgTime =
        entries.length ? entries.reduce((s, e) => s + (e.time || 0), 0) / entries.length : NaN;
      const avgIn =
        entries.length ? entries.reduce((s, e) => s + (e.tokensIn || 0), 0) / entries.length : NaN;
      const avgUncachedIn =
        entries.length ? entries.reduce((s, e) => s + (e.uncachedTokensIn || 0), 0) / entries.length : NaN;
      const avgCacheWrite =
        entries.length ? entries.reduce((s, e) => s + (e.cacheWriteTokens || 0), 0) / entries.length : NaN;
      const avgCached =
        entries.length ? entries.reduce((s, e) => s + (e.cachedTokens || 0), 0) / entries.length : NaN;
      const avgOpenRouterCost =
        entries.length ? entries.reduce((s, e) => s + (e.openRouterCost || 0), 0) / entries.length : NaN;
      const avgOut =
        entries.length ? entries.reduce((s, e) => s + (e.tokensOut || 0), 0) / entries.length : NaN;

      rows.push([
        project,
        survivors,
        cSucc || "",
        cFSyn || "",
        cFForb || "",
        cFOrig || "",
        cFPass || "",
        Number.isFinite(avgTime) ? fmt2(avgTime) : "",
        Number.isFinite(avgIn) ? fmt2(avgIn) : "",
        ...(includeCacheMetrics
          ? [
              Number.isFinite(avgUncachedIn) ? fmt2(avgUncachedIn) : "",
              Number.isFinite(avgCacheWrite) ? fmt2(avgCacheWrite) : "",
              Number.isFinite(avgCached) ? fmt2(avgCached) : "",
              Number.isFinite(avgOpenRouterCost) ? fmtCost(avgOpenRouterCost) : "",
            ]
          : []),
        Number.isFinite(avgOut) ? fmt2(avgOut) : "",
      ]);

      totalSurvivors += survivors;
      totalSucc += cSucc;
      totalFSyn += cFSyn;
      totalFForb += cFForb;
      totalFOrig += cFOrig;
      totalFPass += cFPass;

      if (Number.isFinite(avgTime)) {
        weightedTime += survivors * avgTime;
        denomTime += survivors;
      }
      if (Number.isFinite(avgIn)) {
        weightedIn += survivors * avgIn;
        denomIn += survivors;
      }
      if (includeCacheMetrics && Number.isFinite(avgUncachedIn)) {
        weightedUncachedIn += survivors * avgUncachedIn;
        denomUncachedIn += survivors;
      }
      if (includeCacheMetrics && Number.isFinite(avgCacheWrite)) {
        weightedCacheWrite += survivors * avgCacheWrite;
        denomCacheWrite += survivors;
      }
      if (includeCacheMetrics && Number.isFinite(avgCached)) {
        weightedCached += survivors * avgCached;
        denomCached += survivors;
      }
      if (includeCacheMetrics && Number.isFinite(avgOpenRouterCost)) {
        weightedOpenRouterCost += survivors * avgOpenRouterCost;
        denomOpenRouterCost += survivors;
      }
      if (Number.isFinite(avgOut)) {
        weightedOut += survivors * avgOut;
        denomOut += survivors;
      }
    }

    const waTime = denomTime ? weightedTime / denomTime : NaN;
    const waIn = denomIn ? weightedIn / denomIn : NaN;
    const waUncachedIn = denomUncachedIn ? weightedUncachedIn / denomUncachedIn : NaN;
    const waCacheWrite = denomCacheWrite ? weightedCacheWrite / denomCacheWrite : NaN;
    const waCached = denomCached ? weightedCached / denomCached : NaN;
    const waOpenRouterCost = denomOpenRouterCost ? weightedOpenRouterCost / denomOpenRouterCost : NaN;
    const waOut = denomOut ? weightedOut / denomOut : NaN;

    rows.push([
      "Total",
      totalSurvivors,
      totalSucc || "",
      totalFSyn || "",
      totalFForb || "",
      totalFOrig || "",
      totalFPass || "",
      Number.isFinite(waTime) ? fmt2(waTime) : "",
      Number.isFinite(waIn) ? fmt2(waIn) : "",
      ...(includeCacheMetrics
        ? [
            Number.isFinite(waUncachedIn) ? fmt2(waUncachedIn) : "",
            Number.isFinite(waCacheWrite) ? fmt2(waCacheWrite) : "",
            Number.isFinite(waCached) ? fmt2(waCached) : "",
            Number.isFinite(waOpenRouterCost) ? fmtCost(waOpenRouterCost) : "",
          ]
        : []),
      Number.isFinite(waOut) ? fmt2(waOut) : "",
    ]);

    const csv = stringify(rows, { header: false, quoted_match: /\r|\n|,|"/ });
    await writeFile(path.join(outDir, `${att}.csv`), csv);
  }
}

/**
 * Build the summary table with:
 * Project Name | #Tested mutants | attempt_i.successful... | total successes | fail_* (from last attempt) | time | tokens_in | [cache metrics] | tokens_out
 * time/tokens are TRUE TOTALS per project (each mutant contributes its final-attempt entry).
 */
export function summarizeReport(
  report: Report,
  survivingMap: MutationsMap,
  maxAttempts: number
): { headers: string[]; rows: Array<(string | number | "")[]> } {
  // Build headers
  const includeCacheMetrics = reportHasCacheMetrics(report);
  const headers = buildSummaryHeaders(maxAttempts, includeCacheMetrics);
  const rows: Array<(string | number | "")[]> = [];
  const labels = attemptLabels(maxAttempts);

  // grand totals
  let grandTested = 0;
  const grandAttemptSucc = Object.fromEntries(labels.map((l) => [l, 0])) as Record<
    AttemptLabel,
    number
  >;
  let grandTotalSucc = 0;
  let grandFSyn = 0,
    grandFForb = 0,
    grandFOrig = 0,
    grandFPass = 0;
  let grandTime = 0,
    grandIn = 0,
    grandOut = 0,
    grandUncachedIn = 0,
    grandCacheWrite = 0,
    grandCached = 0,
    grandOpenRouterCost = 0;

  for (const [project, proj] of report) {
    const tested = Object.keys(survivingMap[project] || {}).length;
    grandTested += tested;

    // attempt_i.successful per project (numeric)
    const attemptSucc: number[] = labels.map((l) => {
      const n = Object.keys(proj.attempts.get(l).get("successful")).length;
      grandAttemptSucc[l] += n;
      return n;
    });
    const totalSucc = attemptSucc.reduce((s, v) => s + v, 0);
    grandTotalSucc += totalSucc;

    // last attempt fail_* per project
    const last = lastAttemptLabel(proj);
    const lastB = proj.attempts.get(last);
    const fSyn = Object.keys(lastB.get("fail_syntax_error")).length;
    const fForb = Object.keys(lastB.get("fail_forbidden_libraries")).length;
    const fOrig = Object.keys(lastB.get("fail_fail_on_original")).length;
    const fPass = Object.keys(lastB.get("fail_pass_on_mutation")).length;
    grandFSyn += fSyn;
    grandFForb += fForb;
    grandFOrig += fOrig;
    grandFPass += fPass;

    // true totals: per mutant, take its final attempt entry
    const mutants = uniqMutants(proj);
    let sumT = 0,
      sumIn = 0,
      sumOut = 0,
      sumUncachedIn = 0,
      sumCacheWrite = 0,
      sumCached = 0,
      sumOpenRouterCost = 0;
    const projAttemptLabels = (Array.from(proj.attempts.keys()) as AttemptLabel[]).sort(
      (a, b) => parseAttemptNumber(a) - parseAttemptNumber(b)
    );
    for (const mid of mutants) {
      let best: {
        t: number;
        i: number;
        o: number;
        u: number;
        cw: number;
        c: number;
        cost: number;
      } | null = null;
      let bestNum = -1;
      for (const lab of projAttemptLabels) {
        const num = parseAttemptNumber(lab);
        const b = proj.attempts.get(lab);
        let e: any = null;
        for (const c of CATEGORY_ORDER) {
          const v = b.get(c)[mid];
          if (v) {
            e = v;
            break;
          }
        }
        if (e && num > bestNum) {
          best = {
            t: e.time || 0,
            i: e.tokensIn || 0,
            o: e.tokensOut || 0,
            u: e.uncachedTokensIn || 0,
            cw: e.cacheWriteTokens || 0,
            c: e.cachedTokens || 0,
            cost: e.openRouterCost || 0,
          };
          bestNum = num;
        }
      }
      if (best) {
        sumT += best.t;
        sumIn += best.i;
        sumOut += best.o;
        sumUncachedIn += best.u;
        sumCacheWrite += best.cw;
        sumCached += best.c;
        sumOpenRouterCost += best.cost;
      }
    }
    grandTime += sumT;
    grandIn += sumIn;
    grandOut += sumOut;
    grandUncachedIn += sumUncachedIn;
    grandCacheWrite += sumCacheWrite;
    grandCached += sumCached;
    grandOpenRouterCost += sumOpenRouterCost;

    const attemptSuccOut: Array<number | ""> = attemptSucc.map((n) => (n ? n : ""));

    rows.push([
      project,
      tested,
      ...attemptSuccOut,
      totalSucc || "",
      fSyn || "",
      fForb || "",
      fOrig || "",
      fPass || "",
      fmt2(sumT),
      fmt2(sumIn),
      ...(includeCacheMetrics
        ? [
            fmt2(sumUncachedIn),
            fmt2(sumCacheWrite),
            fmt2(sumCached),
            fmtCost(sumOpenRouterCost),
          ]
        : []),
      fmt2(sumOut),
    ]);
  }

  const grandAttemptSuccOut: Array<number | ""> = labels.map((l) =>
    grandAttemptSucc[l] ? grandAttemptSucc[l] : ""
  );

  rows.push([
    "Total",
    grandTested,
    ...grandAttemptSuccOut,
    grandTotalSucc || "",
    grandFSyn || "",
    grandFForb || "",
    grandFOrig || "",
    grandFPass || "",
    fmt2(grandTime),
    fmt2(grandIn),
    ...(includeCacheMetrics
      ? [
          fmt2(grandUncachedIn),
          fmt2(grandCacheWrite),
          fmt2(grandCached),
          fmtCost(grandOpenRouterCost),
        ]
      : []),
    fmt2(grandOut),
  ]);

  return { headers, rows };
}
