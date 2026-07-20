// src/config/cli.ts
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import type { CliArgs, RateLimitMode } from "../types";
import { resolveFromRoot, createDirectoryIfMissing } from "../utils";

export async function parseCliArgs(): Promise<CliArgs> {
  const parser = yargs(hideBin(process.argv))
    .strict()
    .wrap(Math.min(100, process.stdout.columns || 100))
    .options({
      model: {
        alias: "m",
        type: "string",
        default: "mistralai/devstral-2512",
        describe: "LLM model",
      },
      temperature: {
        alias: "t",
        type: "number",
        default: 0.5,
        describe: "Model temperature (0 ≤ value ≤ 1)",
        coerce: (v) => {
          if (v < 0 || v > 1) 
            throw new Error("--temperature must be between 0 and 1");
          return v;
        },
      },
      attempts: {
        alias: "a",
        type: "number",
        default: 10,
        describe: "Max attempts to generate a test to kill a mutation",
        coerce: (v) => {
          if (!Number.isInteger(v) || v < 1)
            throw new Error("--attempts must be an integer ≥ 1");
          return v;
        },
      },
      timeout: {
        alias: "T",
        type: "number",
        default: 300,
        describe: "Per-attempt time budget AND git lock max-age (seconds)",
        coerce: (v) => {
          if (!Number.isInteger(v) || v < 1)
            throw new Error("--timeout must be integer ≥ 1");
          return v;
        },
      },

      // Selection knobs
      subjectsDir: {
        alias: "s",
        type: "string",
        default: "../subject_repositories",
        describe:
          "Address of the base directory containing subject repositories(can be absolute or relative to project root.). Ignored if --projectPath is provided.",
        coerce: (v: string) => resolveFromRoot(v), // normalize to absolute
      },
      projects: {
        alias: "P",
        type: "string",
        describe:
          "Comma-separated list of project names to run (e.g., 'zip-a-folder,crawler-url-parser'). Ignored if --projectPath is provided.",
        coerce: (v?: string) =>
          v ? v.split(",").map(
            (s) => s.trim()
          ).filter(Boolean) : undefined,
      },
      projectPath: {
        type: "string",
        describe:
          "Path to(can be absolute or relative to project root) a single project repository. If provided, only that project will run and its path overrides --subjectsDir.",
        coerce: (v: string) => resolveFromRoot(v), // normalize to absolute
      },
      mutationFilter: {
        alias: "f",
        type: "string",
        default: "mutations/requiredSample_list.json",
        describe:
          "Path to(can be absolute or relative to project root) the JSON file specifying mutation filters (project → [mutantIds]). Ignored if --mutationId is provided.",
        coerce: (v: string) => resolveFromRoot(v), // normalize to absolute
      },
      mutationId: {
        alias: "M",
        type: "string",
        describe:
          'Run exactly one mutation by its ID (e.g., "mutant-abc123..."). When provided, --mutationFilter is ignored.',
      },

      // Output directory for final artifacts
      outDir: {
        alias: "o",
        type: "string",
        default: "generated_tests",
        describe:
          "Address of the directory where final generated tests/artifacts/reports are written (can be absolute or relative to project root.)",
        coerce: (v: string) => resolveFromRoot(v), // normalize to absolute
      },

      // Rate limiting / retries
      "rate-limit": {
        alias: "L",
        type: "string",
        default: "adaptive",
        describe:
          'Rate limiting mode. Accepted values: "adaptive" (default), "none", "benchmark", or a fixed delay in milliseconds (e.g. 750).',
        coerce: (v: string) => {
          const lower = v.toLowerCase();
          if (["adaptive", "none", "benchmark"].includes(lower)) {
            return { mode: lower as RateLimitMode, ms: undefined };
          }
          const n = Number(v);
          if (Number.isInteger(n) && n >= 0) {
            return { mode: "fixed" as RateLimitMode, ms: n };
          }
          throw new Error(
            '--rate-limit must be "adaptive", "none", "benchmark", or a non-negative integer (ms).'
          );
        },
      },
      "network-retries": {
        alias: "R",
        type: "number",
        default: 3,
        describe:
          "Number of retries for network/API errors (e.g., 429 rate limits, 5xx responses).",
        coerce: (v) => {
          if (!Number.isInteger(v) || v < 0)
            throw new Error("--network-retries must be an integer ≥ 0");
          return v;
        },
      },
      caching: {
        type: "boolean",
        default: true,
        description:
          "whether to cache the results of queries to the model (default: true)",
      },
      cacheDir: {
        type: "string",
        default: "llm-cache",
        description: "path to directory where cache files are located",
        coerce: (v: string) => resolveFromRoot(v),
      },
      withTests: {
        type: "boolean",
        default: false,
        describe:
          "If true, use initialPromptWithTestCases.hb and write under .../withTests/... (otherwise .../withoutTests/...)",
      },
    })
    .help("help")
    .alias("help", "h")
    .conflicts({ projectPath: ["projects"] });

  const argv = await parser.parseAsync();

  const effectiveOutDir   = argv.outDir as string;
  const cacheDirAbs = argv.cacheDir as string;
  await createDirectoryIfMissing(effectiveOutDir);
  if (argv.caching) {
    await createDirectoryIfMissing(cacheDirAbs);
  }

  const { 
    mode: rateLimitMode,
    ms: rateLimitMs 
  } = argv["rate-limit"] as {
    mode: RateLimitMode;
    ms?: number;
  };

  return {
    model: argv.model,
    temperature: argv.temperature,

    mutationFile: argv.mutationFilter, // absolute; ignored if mutationId is provided
    mutationId: argv.mutationId,

    maxAttempts: argv.attempts,
    rateLimitMode,
    rateLimitMs,
    transportRetries: argv["network-retries"],
    timeoutSeconds: argv.timeout,

    subjectsDir: argv.subjectsDir, // absolute base path to subjects
    projects: argv.projects, // string[] | undefined
    projectPath: argv.projectPath, // string | undefined

    effectiveOutDir,
    cacheDir: cacheDirAbs,

    caching: argv.caching,
    withTests: argv.withTests,
  };
}