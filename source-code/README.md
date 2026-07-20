# 🧬 Mutant Killer

This project automates **test generation for surviving mutants** across multiple open-source JavaScript/TypeScript subject repositories.
It drives an LLM, compiles/runs the generated tests on both the **original** and **mutated** code, and records artifacts for analysis.
It supports flexible invocation modes, running on all projects, specific projects, or even a single mutant of a single project.

---

## 🚀 Getting Started

### Prerequisites

Before running, ensure:

- Node.js ≥ 20.19.4 is installed.
- Mutation JSON files exist under `mutations/<projectName>/`, one per mutation ID.

---

### ⚡ Quick Start

1. **Install dependencies**

```bash
npm ci
npm run build
```

2. **Configure OpenRouter-compatible API access** as described in
   [API Configuration](#api-configuration).

### API Configuration

- The artifact includes a preconfigured reviewer key in `.env`. It has a USD 10 usage limit and is intended for the reduced artifact-evaluation workflow.
- To use your own credentials, copy `.env.example` to `.env` and fill in `OPENROUTER_API_KEY`. You can obtain an API key from OpenRouter at <https://openrouter.ai/workspaces/default/keys>.
- Alternatively, set `OPENROUTER_LLM_AUTH_HEADERS` directly if you need custom authorization headers.
- `OPENROUTER_LLM_API_ENDPOINT` defaults to OpenRouter's chat completions endpoint in the artifact Docker workflow.
- `GITHUB_TOKEN` is optional and is not required for the default artifact workflow with public subject repositories. It is passed through to the environment for workflows that need authenticated GitHub access, such as private repository cloning or dependency installation.
- By default, `OPENROUTER_ENABLE_AUTO_CACHE=true` enables OpenRouter prompt caching and cache-metric reporting for supported Claude models; set it to `false` to disable this cache mode.

3. **Prepare the subject repositories.** When using the artifact Docker
   workflow, `run-docker.sh` automatically clones the URLs in
   [`../subject_repositories.txt`](../subject_repositories.txt) into
   `../subject_repositories/`. This startup step requires internet access and
   took less than 2 minutes on the tested system; allow up to 15 minutes
   depending on network and GitHub performance.
   - Use the repositories in the anonymous
     [`mutant-survivor-testgen-benchchmark`](https://github.com/mutant-survivor-testgen-benchchmark)
     GitHub organization, not the original upstream repositories.
   - The prepared repositories
     contain the `main` branch and the `mutant-<id>` branches required by the runner.
   - Repository provenance is documented in
     [`../subject_repositories.md`](../subject_repositories.md).

   When running without Docker, clone the required repositories manually into
   `../subject_repositories/`. For example:

   ```bash
   mkdir -p ../subject_repositories
   cd ../subject_repositories
   git clone https://github.com/mutant-survivor-testgen-benchchmark/zip-a-folder.git
   ```

4. **Run**

   ```bash
   # Run one mutation of one project
   node dist/src/run.js --projectPath ../subject_repositories/zip-a-folder --mutationId mutant-2a53823848761e41b96dc87df8df27054ee4b80d

   # Run specific projects
   node dist/src/run.js --projects zip-a-folder,countries-and-timezones

   # Use a custom mutation filter
   node dist/src/run.js --projects zip-a-folder --mutationFilter ./mutations/reducedTestSample_list.json
   ```

---

## ⚙️ Command Overview

All commands are run via:

```bash
node dist/src/run.js [options]
```

---

## 🧩 Core Arguments

| Argument            | Alias | Description                                                                                                                                            |
| ------------------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--projectPath`     | —     | Path (absolute or relative) to a **single subject repository**. When provided, only this project is run.                                               |
| `--projects`        | `-P`  | Comma-separated list of project names to run. These projects must exist inside the specified subjects directory (default: `../subject_repositories/`). |
| `--subjectsDir`     | `-s`  | Base directory containing subject repositories under test. Defaults to `../subject_repositories/`.                                                     |
| `--mutationFilter`  | `-f`  | Path (absolute or relative) to a JSON file listing which mutations to run for each project (default: `mutations/requiredSample_list.json`).            |
| `--mutationId`      | `-M`  | ID of one specific mutation to run from a single project (requires `--projectPath` or `--projects` with exactly one project).                          |
| `--model`           | `-m`  | LLM model used for test generation (default: `mistralai/devstral-2512`).                                                                               |
| `--attempts`        | `-a`  | Number of attempts per mutation (default: 10).                                                                                                         |
| `--temperature`     | `-t`  | Model temperature between 0 and 1 (default: 0.5).                                                                                                      |
| `--timeout`         | `-T`  | Time budget per attempt (default: 300 seconds).                                                                                                        |
| `--caching`         | —     | Whether to cache the artifacts. When enabled, cache hits reuse existing artifacts; cache misses add newly generated artifact (default: `true`).        |
| `--cacheDir`        | —     | Path to the directory where cached artifacts are located (default: `llm-cache`).                                                                       |
| `--outDir`          | `-o`  | Directory where generated tests/artifacts/reports are written (default: `generated_tests`).                                                            |
| `--withTests`       | —     | If true, use initialPromptWithTestCases.hb (default: `false`).                                                                                         |
| `--rate-limit`      | `-L`  | Rate limiting mode or fixed delay in milliseconds. Options: `"adaptive"` (default), `"none"`, `"benchmark"`, or a number like `750` for ms delay.      |
| `--network-retries` | `-R`  | Number of retries for network/API errors (default: 3).                                                                                                 |

When running in caching mode, the runner behaves as follows:

- **Cache hit** (mutation already in cache):  
  Existing artifacts for that mutation are copied from the cache into the current output directory, and no new LLM calls are made.
- **Cache miss** (mutation not in cache):  
  The worker generates tests and artifacts for that mutation into the cache, and then those artifacts are mirrored into the current output directory.

---

### 💨 Rate Limiting Details

| Mode        | Description                                                                         |
| ----------- | ----------------------------------------------------------------------------------- |
| `adaptive`  | Default mode. Automatically adjusts request rate based on API latency and feedback. |
| `none`      | Disables pacing entirely (use with caution).                                        |
| `benchmark` | Starts at 10s delay, then 5s, then 2.5s (throughput benchmarking).                  |
| `<number>`  | Fixed delay in milliseconds between API calls (e.g., `-L 750` adds ~0.75 s delay).  |

> Example: `node dist/src/run.js --rate-limit 750` → applies a 750 ms delay between API requests.  
> Example: `node dist/src/run.js --rate-limit none` → disables pacing completely.

---

## 🧠 Mutations: Layout & Examples

Each project has its own mutation data stored in:

```
mutations/<projectName>/<mutationId>.json
```

An example of what these json files look like:

```json
{
  "file": "lib/ZipAFolder.ts",
  "startLine": 81,
  "startColumn": 28,
  "endLine": 82,
  "endColumn": 35,
  "originalCode": "\n-  store: true,",
  "replacement": "\n+ store: false,\n\n",
  "removedLines": ["  store: true,"],
  "addedLines": ["  store: false,", "", ""],
  "lineSummary": ["-  store: true,", "+ store: false,", "", ""],
  "mutatorName": "BooleanLiteral",
  "strykerMutationId": "123"
}
```

Your **`--mutationId`** must correspond to a JSON file that exists in this structure.

---

## 🧾 Mutation Filters

A **filter list** is a JSON map of project → array of mutation IDs. The default filter is:

```
mutations/requiredSample_list.json
```

An example of what these json files look like:

```json
{
  "Complex.js": [
    "mutant-98d178faa1370d51cdfa009f84cf5c69757271b0",
    "mutant-069e42662bf7e2855ea594d107b1500ac16cce03"
  ],
  "countries-and-timezones": [
    "mutant-45020db3cfa35f1bb5f9504ac1cd19676e3e36f1",
    "mutant-73156396e2cd912dc6a9eeb65831101a9735a3f8"
  ]
}
```

The runner will read this map, verify that the repositories exist under the **subjects directory**, and then load each mutation JSON from `mutations/<project>/<id>.json`.

### Provided Filters

| File                                    | Description                                                                                                                                                                                                                                                                                                                       |
| --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `SmallRandomSurvivingMutants_list.json` | 10 random samples per subject repository.                                                                                                                                                                                                                                                                                         |
| `reducedTestSample_list.json`           | Small smoke-run sample with one mutation from each of the 13 subject repositories, useful for trying the workflow without running the full evaluation sample.                                                                                                                                                                     |
| `RandomSurvivingMutants_list.json`      | 100 random samples per subject repository.                                                                                                                                                                                                                                                                                        |
| `requiredSample_list.json`              | Revised evaluation sample: 915 surviving mutants across 13 subject repositories. For each project, the sample size was chosen using Cochran's sample-size formula for proportions with finite-population correction, 95% confidence, 5% margin of error, and the conservative population-proportion estimate $p=0.5$. _(Default)_ |
| `all_mutant_ids_list.json`              | Complete population of surviving mutants from StrykerJS across all 13 projects. This serves as the population from which `requiredSample_list.json` was randomly drawn.                                                                                                                                                           |

> All mutations referenced by these lists are present under the `mutations/` tree.

---

## 🧩 Templates

Prompt templates live under `templates/` and are rendered at runtime to build the LLM prompts.
Key files include:

- `initialPrompt.hb` and `initialPromptWithTestCases.hb` (first attempt, with/without existing tests)
- `retry_*.hb` (follow‑up attempts based on prior failure category)
- `subject_tests/*.txt` and `subject_allowed_libraries/*.txt` (per‑project context and allowed libs)
- `systemPrompt.hb` (shared system‑level instructions)

---

<a id="usage-examples"></a>

## 💡 Usage Examples

## ⚠️ Subject Repository Side Effects

LLMutantKiller executes generated tests by changing branches inside the subject repository. For each test execution, it:

- runs `git stash --include-untracked --quiet`;
- checks out `main` or the requested `mutant-<id>` branch;
- installs subject dependencies with `npm ci` when a modern lockfile is present, otherwise `npm install`; and
- may retry dependency installation with `--ignore-scripts` if lifecycle scripts or native builds fail.

Use clean clones of the prepared subject repositories for LLMutantKiller runs. The runner does not automatically restore stashes at the end of a run, so do not keep unrelated work in those repositories.

### 1️⃣ Run a Single Mutation on One Project

```bash
node dist/src/run.js --projectPath ../subject_repositories/zip-a-folder --mutationId mutant-2a53823848761e41b96dc87df8df27054ee4b80d
```

- Runs only one mutation of the project `zip-a-folder`.
- `projectPath` can be **absolute** or **relative**.
- The mutation JSON must exist under:
  ```
  mutations/zip-a-folder/mutant-2a53823848761e41b96dc87df8df27054ee4b80d.json
  ```
- The CLI argument uses the full mutation ID because it must match the JSON file name. Output directories and reports use the shortened form, for example `mutant-2a53823`.

---

### 2️⃣ Run Multiple Projects Using Default Filter

```bash
node dist/src/run.js --projects zip-a-folder,countries-and-timezones
```

- Runs all mutations from the **default filter** for the listed projects, assuming the subject repositories are cloned in the default address for the subject repositories.

---

### 3️⃣ Run Projects Using a Custom Mutation Filter

```bash
node dist/src/run.js \
  --projects countries-and-timezones \
  --mutationFilter ./mutations/reducedTestSample_list.json
```

- Uses a custom filter file (relative or absolute path accepted).
- Only listed mutations for the specified projects are executed.

---

### 4️⃣ Default Behavior (No Arguments)

```bash
npm start
```

- Uses default subjects directory `../subject_repositories/`  
  and default filter `mutations/requiredSample_list.json`.

---

## ⚠️ Argument Rules & Restrictions

- `--projectPath` and `--projects` are mutually exclusive.
- `--mutationId` requires `--projectPath` or `--projects` with exactly one project.
- If `--mutationId` is provided, `--mutationFilter` is ignored.
- Paths can be absolute or relative to the project root.
- Each mutation ID must exist under its corresponding `mutations/<projectName>/` folder.

---

## 📂 Directory Structure

Example layout:

```
mutant-killer/
├── llm-cache/
│   └── <model>/
│       └── temp_<temperature>/
│           └── <withTests|withoutTests>/
│               └── cached/
│                   └── artifacts/
│                       └── <projectName>/
│                           └── attempt_<i>/
│                               └── <category>/
│                                   └── <mutantShortId>/
├── mutations/
│   ├── zip-a-folder/
│   │   ├── mutant-2a53823848761e41b96dc87df8df27054ee4b80d.json
│   │   └── ...
│   ├── countries-and-timezones/
│   │   ├── mutant-45020db3cfa35f1bb5f9504ac1cd19676e3e36f1.json
│   │   └── ...
│   ├── SmallRandomSurvivingMutants_list.json
│   ├── RandomSurvivingMutants_list.json
│   ├── requiredSample_list.json
│   └── all_mutant_ids_list.json
└── src/
    └── ...
```

- `<model>` is the model slug (e.g., `mistralai_devstral-2512`).

---

## 🧪 Result Categories

Each mutation attempt is classified into one of five categories:

- **`fail_syntax_error`**  
  The generated test cannot run on the original branch due to a syntax error (e.g., invalid TypeScript/Jest).  
  The test is rejected before it can be evaluated against the mutant.

- **`fail_forbidden_libraries`**  
  The generated test imports libraries outside the allowed set for that subject repository.  
  The test is rejected before it can be evaluated against the mutant.

- **`fail_fail_on_original`**  
  The generated test fails on the original branch (after optionally splitting mixed suites into purely failing/passing tests).  
  The test is rejected before it can be evaluated against the mutant.

- **`fail_pass_on_mutation`**  
  The generated test passes on both original and mutated branches.

- **`successful`**  
  The generated test passes on the original branch **and** fails on the mutated branch.  
  This is a true mutant kill.

---

## 📦 Artifacts per Mutation Attempt

For each mutation and attempt, the runner stores artifacts in:

```text
<outDir>/<model>/temp_<temperature>/<withTests|withoutTests>/<timestamp>/artifacts/<projectName>/attempt_i/<category>/<mutantShortId>/
```

Each such directory contains:

1. **`chatHistory.json`**  
   Full conversation history between the runner and the LLM for this mutation and up to this attempt.

2. **`main_log.txt`**  
   Jest output when the generated test is run on the **original** (unmutated) code.

3. **`mutated_log.txt`**  
   Jest output when the generated test is run on the **mutated** code.  
   This file exists only for `successful` and `fail_pass_on_mutation` categories (categories that actually run against the mutated branch).

4. **`prompt_<i>.txt`**  
   Rendered user prompt sent to the LLM for this attempt.

5. **`testCase.test.ts`**  
   The generated Jest test file for this attempt and mutation.

6. **`meta_report.json`**  
   A compact JSON summary used for reporting (one per recorded attempt/category/mutant).  
   It includes fields such as project name: `project`, `mutationShortId`, attempt index: `attempt`, final category: `category`, `elapsedSeconds`, token counts: `tokensIn` and `tokensOut`, and the relative address of this artifacts directory: `address`.
   Exception: when a generated file contains a mixed test suite, LLMutantKiller may archive an auxiliary `fail_fail_on_original` split-test directory for inspection; that auxiliary archive is not a final attempt outcome and may not contain `meta_report.json`.

---

## 🗂 Output Directory Layout

The main output directory is controlled by `--outDir` (default: `generated_tests`).  
For each run, results are grouped under a model- and timestamp-specific subdirectory:

```text
<outDir>/<model>/temp_<temperature>/<withTests|withoutTests>/<timestamp>/
├── artifacts/
│   └── ...
└── reports/
    ├── attempt_1.csv
    ├── attempt_2.csv
    ├── ...
    ├── errors.json
    ├── report.json
    ├── summary.csv
    └── summary.txt
```

- `<timestamp>` is a run-specific identifier (e.g., `2025-08-21_12-26`).

---

## 📊 Report Files

Under:

```text
<outDir>/<model>/temp_<temperature>/<withTests|withoutTests>/<timestamp>/reports/
```

the runner produces:

When running supported Claude models with OpenRouter prompt caching enabled (`OPENROUTER_ENABLE_AUTO_CACHE=true`), report files may include cache-specific fields. Set `OPENROUTER_ENABLE_AUTO_CACHE=false` to disable this cache mode. The cache-specific fields are `uncachedTokensIn` (input tokens not served from or written to the prompt cache), `cacheWriteTokens` (input tokens written to the prompt cache), `cachedTokens` (input tokens served from the prompt cache), and `openRouterCost` (the cost reported by OpenRouter).

1. **`report.json`**  
   A structured, per-project, per-attempt, per-category map of all mutants and their metrics, e.g.:

   ```json
   {
     "pull-stream": {
       "attempts": {
         "attempt_1": {
           "successful": {
             "mutant-8303b1e": {
               "time": 16,
               "tokensIn": 900,
               "uncachedTokensIn": 250,
               "cacheWriteTokens": 300,
               "cachedTokens": 350,
               "tokensOut": 386,
               "openRouterCost": 0.000123,
               "address": "generated_tests/mistralai_devstral-2512/temp_0.5/withoutTests/2026-04-28_18-22/artifacts/pull-stream/attempt_1/successful/mutant-8303b1e"
             }
           },
           "fail_fail_on_original": {
             "mutant-9e28478": {
               "time": 13,
               "tokensIn": 1100,
               "tokensOut": 417,
               "address": "generated_tests/mistralai_devstral-2512/temp_0.5/withoutTests/2026-04-28_18-22/artifacts/pull-stream/attempt_1/fail_fail_on_original/mutant-9e28478"
             }
           }
         }
       },
       "errors": [
         "mutant-392c34c: Error: TIMEOUT: pull-stream :: mutant-392c34c exceeded 300s"
       ]
     }
   }
   ```

   Each report leaf entry corresponds to a recorded final attempt outcome and is derived from the corresponding `meta_report.json` in the artifacts tree. Auxiliary `fail_fail_on_original` split-test archives created during mixed-suite handling are inspection artifacts, not report leaves, and may not contain `meta_report.json`. The `uncachedTokensIn`, `cacheWriteTokens`, `cachedTokens`, and `openRouterCost` fields appear only when running a supported Claude model with OpenRouter prompt caching enabled.

2. **`errors.json`**  
   Map of project name → list of error strings encountered during the run (e.g., timeouts, Jest failures, infrastructure issues).

3. **`summary.csv`**  
   Per-project aggregate metrics of all attempts, including the number of tested mutants, counts per final category, per attempt successes, total successes, and total time/tokens.  
   This is a machine-friendly version of `summary.txt`.

4. **`summary.txt`**  
   A human-readable summary table, e.g.:

   ```text
   +---------------------------+-----------------+----------------------+----------------------+-----------------+-------------------+--------------------------+-----------------------+--------------------------+--------+------------+------------+
   | Project Name              | #Tested mutants | attempt_1.successful | attempt_2.successful | total successes | fail_syntax_error | fail_forbidden_libraries | fail_fail_on_original | fail_pass_on_mutation    | time   | tokens_in  | tokens_out |
   +===========================+=================+======================+======================+=================+===================+==========================+=======================+==========================+========+============+============+
   | Complex.js                | 2               |                      | 1                    | 1               |                   | 0                        |                       | 1                        | 66.00  | 48961.00   | 2309.00    |
   | countries-and-timezones   | 2               | 2                    |                      | 2               |                   | 0                        |                       |                          | 45.00  | 1476.00    | 872.00     |
   | Total                     | 4               | 2                    | 1                    | 3               |                   | 0                        |                       | 1                        | 111.00 | 50437.00   | 3181.00    |
   +---------------------------+-----------------+----------------------+----------------------+-----------------+-------------------+--------------------------+-----------------------+--------------------------+--------+------------+------------+
   ```

5. **`attempt_<i>.csv`**  
   Per-attempt breakdown across all projects for attempt `i`, including per-category counts and aggregate time/token statistics for that attempt only.

---

## 🧭 Summary of Execution Modes

| Mode                    | Required Args                                         | Description                               |
| ----------------------- | ----------------------------------------------------- | ----------------------------------------- |
| **Single mutation**     | `--projectPath` or `--projects` (one), `--mutationId` | Runs one mutation on one project.         |
| **Subset of projects**  | `--projects`, optional `--mutationFilter`             | Runs multiple projects.                   |
| **Full run**            | none                                                  | Runs all projects in default filter.      |
| **Custom subjects dir** | `--subjectsDir /path/to/dir`                          | Runs projects from a different directory. |

---

## 🧑‍💻 Example Custom Usage

```bash
node dist/src/run.js \
  --projects zip-a-folder \
  --mutationFilter ./mutations/RandomSurvivingMutants_list.json \
  --model anthropic/claude-sonnet-4.6 \
  --temperature 0.3 \
  --attempts 3 \
  --rate-limit 750
```

---

## ✅ Notes

- All paths resolve relative to the project root unless absolute.
- Mutations must exist beforehand, the system does not generate them.
- Adjust rate limiting via `--rate-limit` to avoid exceeding API quotas.
- When caching is enabled, cache artifacts live under `llm-cache/` and are reused across runs, while each run still writes its own copy under `<outDir>/<model>/temp_<temperature>/<withTests|withoutTests>/<timestamp>/artifacts/`.
