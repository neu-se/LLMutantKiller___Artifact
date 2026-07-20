// src/utils/reporting/report.ts

import {
  Report,
  AttemptBucket,
  AttemptLabel,
  Category,
  // AttemptResult,
  ProjectReport,
  AttemptCategoryBucket,
  PerAttemptCounts,
  PerAttemptAgg,
} from "../../types";
import { DefaultMap } from "../";

/* 
=========================
          helpers
========================= 
*/

/** Canonical order used for headers/aggregation (left-to-right) */
export const CATEGORY_ORDER: ReadonlyArray<Category> = [
  "successful",
  "fail_syntax_error",
  "fail_forbidden_libraries",
  "fail_fail_on_original",
  "fail_pass_on_mutation",
];

// /** Return the mean of a list of numbers, or "" if list is empty. */
// function average(nums: number[]): number | "" {
//   if (!nums || nums.length === 0) return "";
//   const sum = nums.reduce((a, b) => a + b, 0);
//   return Number.isFinite(sum) ? +(sum / nums.length).toFixed(2) : "";
// }

/* 
=====================
      Factories
===================== 
*/

// Factory: produces an empty AttemptBucket
export const createAttemptBucket = (): AttemptBucket =>
  new DefaultMap<Category, AttemptCategoryBucket>(() => ({}));

// Factory: produces an empty ProjectReport
export const createProjectReport = (): ProjectReport => ({
  attempts: new DefaultMap<AttemptLabel, AttemptBucket>(createAttemptBucket),
  errors: [],
});

/** Factory: make a fresh per-attempt aggregate with zeroed counts and empty arrays */
export function createPerAttemptAgg(): PerAttemptAgg {
  const counts = Object.fromEntries(
    CATEGORY_ORDER.map((c) => [c, 0])
  ) as PerAttemptCounts;

  return {
    ...counts,
    times: [],
    tokensIn: [],
    tokensOut: [],
  };
}

/** attempt label helper: "attempt_1", "attempt_2", ... */
export const createAttemptLabel = (i: number): AttemptLabel =>
  `attempt_${i}` as AttemptLabel;

/* 
=========================
          report.json
=========================
*/

// /**
//  * Retrieve the AttemptBucket for a given project + attempt index.
//  * The DefaultMap will auto-create it if it doesn’t already exist.
//  */
// function getAttemptBucket(
//   report: Report,
//   project: string,
//   attemptIndex: number
// ): AttemptBucket {
//   const proj = report.get(project);
//   return proj.attempts.get(createAttemptLabel(attemptIndex));
// }

// /** 
//  * Record one or more results for a given mutation.
//  * Each AttemptResult is added under its attempt index and category.
//  */
// export function recordResults(
//   report: Report,
//   project: string,
//   mutationShortId: string,
//   results: AttemptResult[]
// ) {
//   for (const r of results) {
//     const attemptBucket = getAttemptBucket(report, project, r.attempt);
//     const categoryBucket = attemptBucket.get(r.category);
//     categoryBucket[mutationShortId] = {
//       time: r.elapsedSeconds,
//       tokensIn: r.tokensIn,
//       tokensOut: r.tokensOut,
//       address: r.collectedRelPath,
//     };
//   }
// }

/** 
 * Append an error message for a given mutation to the project's error log.
 * Each entry is prefixed with the mutationShortId for easier tracing.
 */
export function pushError(
  report: Report,
  project: string,
  mutationShortId: string,
  err: unknown
) {
  const proj = report.get(project); 
  const msg =
    err instanceof Error
      ? `${mutationShortId}: ${err.name}: ${err.message}`
      : `${mutationShortId}: ${String(err)}`;
  proj.errors.push(msg);
}