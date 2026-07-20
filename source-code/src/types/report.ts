// src/types/report.ts

import { Category } from ".";
import { DefaultMap } from "../utils";

/* =========================
        report.json
   ========================= */

// Shape: { projectName -> ProjectReport }
export type Report = DefaultMap<string, ProjectReport>;

// Shape: project report -> {
//   attempts: { AttemptLabel -> AttemptBucket },
//   errors?: string[]
// }
export type ProjectReport = {
  attempts: DefaultMap<AttemptLabel, AttemptBucket>;
  errors: string[];
};

// Shape: "attempt_<i>"
export type AttemptLabel = `attempt_${number}`;

// Shape: Category -> MutationDict
export type AttemptBucket = DefaultMap<Category, AttemptCategoryBucket>;

// { mutationId -> MutationEntry }
export type AttemptCategoryBucket = Record<string, MutationEntry>;

// Shape: metrics for a single mutation instance
// { time: seconds, tokensIn: number, tokensOut: number, address: string }
export type MutationEntry = {
  time: number;       // seconds
  tokensIn: number;
  tokensOut: number;
  cachedTokens?: number;
  cacheWriteTokens?: number;
  uncachedTokensIn?: number;
  openRouterCost?: number;
  // e.g. generated_tests/<model>/<timeStamp>/<project>/attempt_X/<category>/<shortMutationId>
  address: string;
};

/* =========================
   Table / CSV summarization
   ========================= */

// Shape: counts by category
export type PerAttemptCounts = { [K in Category]: number };

// Shape: aggregate stats per attempt
// { counts by category + arrays of times/tokens for averages }
export type PerAttemptAgg = PerAttemptCounts & {
  times: number[];
  tokensIn: number[];
  tokensOut: number[];
};

/* =========================
   Meta-based reporting
   ========================= */

/**
 * Per-attempt meta for a single mutation.
 * One meta_report.json lives next to the artifacts directory for that attempt.
 */
export type MetaReportEntry = {
  project: string;
  mutationShortId: string;
  attempt: number;
  category: Category;
  elapsedSeconds: number;
  tokensIn: number;
  tokensOut: number;
  cachedTokens?: number;
  cacheWriteTokens?: number;
  uncachedTokensIn?: number;
  openRouterCost?: number;
  /** Path relative to repo root:
   *  "generated_tests/<model>/<runId>/artifacts/<project>/attempt_X/<category>/<shortId>"
   */
  address: string;
};

/**
 * Error metadata for a mutation that failed to run normally.
 * Stored as JSON under: <outDir>/<model>/<runId>/errors/<project>/<shortId>.json
 */
export type ErrorMetaEntry = {
  project: string;
  mutationShortId: string;
  /** Preformatted "shortId: Name: message" string (same style as pushError). */
  error: string;
};
