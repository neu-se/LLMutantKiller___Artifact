// src/types/config.ts

export type RateLimitMode = "none" | "fixed" | "benchmark" | "adaptive";

export type CliArgs = {
  model: string;
  temperature: number;

  /** The *filter list* file (project -> [ids]) — ignored when mutationId is provided */
  mutationFile: string;

  /** If provided, run exactly this one mutation (e.g., "mutant-abc123...") */
  mutationId?: string;

  maxAttempts: number;
  rateLimitMode?: RateLimitMode;   // default: "adaptive"
  rateLimitMs?: number;            // used only when mode === "fixed"
  transportRetries?: number;       // transport-level retries for 429/5xx (default: 3)
  timeoutSeconds: number;          // global: per-attempt budget & git lock max-age

  /** Base dir for subject repositories (ignored when projectPath is provided) */
  subjectsDir: string;

  /** Explicit list of project names to run (ignored when mutationId or projectPath is provided) */
  projects?: string[];

  /** Absolute (or root-relative) path to a single project.
   *  Required when mutationId is provided. */
  projectPath?: string;
  
  /** Absolute path where final artifacts/reports for this run are written (always outDir). */
  effectiveOutDir: string;

  /** Absolute path where cache artifacts are stored (used when caching = true). */
  cacheDir: string;

  /** whether to cache LLM responses */
  caching?: boolean;

  /** If true, use initialPromptWithTestCases and write under .../withTests/... */
  withTests: boolean;
};