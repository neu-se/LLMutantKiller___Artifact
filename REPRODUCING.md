# Full Live Reproduction

This document describes the complete live workflow for reproducing the
LLMutantKiller configurations reported in the paper. For a quick installation
check or a reduced live demonstration, start with the workflows in
[`README.md`](README.md#usage-and-reproduction-workflows). Host requirements,
historical API costs, and measured runtimes are summarized in
[`REQUIREMENTS.md`](REQUIREMENTS.md).

## Scope

Run LLMutantKiller on the 915 randomly sampled surviving mutants listed in
`source-code/mutations/requiredSample_list.json`. The mutants are drawn from the
13 subject applications documented in
[`subject_repositories.md`](subject_repositories.md).

Tables 2–5 use four principal configurations: Claude Sonnet 4.6 with and
without existing tests, Devstral 2512 without tests, and Llama 3.3 70B without
tests. Repeat those four configurations as Round 2 to reproduce the paper's
nondeterminism analysis. The stored results additionally include supplementary
Devstral and Llama runs with existing tests in both rounds. Reproducing every
stored principal and supplementary result therefore requires six configurations
per round.

## Parameters and Configurations

All configurations use:

- 10 attempts per mutant (`--attempts 10`);
- temperature 0.5 (`--temperature 0.5`); and
- a 300-second timeout per attempt (`--timeout 300`).

Each round contains the Cartesian product of:

- **3 models** (`--model`):
  - `anthropic/claude-sonnet-4.6`
  - `mistralai/devstral-2512`
  - `meta-llama/llama-3.3-70b-instruct`
- **2 prompt variants** (`--withTests`):
  - `--withTests false`, excluding existing tests from the initial prompt;
  - `--withTests true`, including existing tests in the initial prompt.

## Example Commands

Run these commands inside the container after completing the setup in the main
README:

```bash
cd /usr/src/app/source-code

# Claude Sonnet 4.6, without tests (Table 2, Round 1)
node dist/src/run.js \
  --mutationFilter ./mutations/requiredSample_list.json \
  --model anthropic/claude-sonnet-4.6 \
  --attempts 10 \
  --temperature 0.5 \
  --timeout 300 \
  --withTests false

# Claude Sonnet 4.6, with tests (Table 3, Round 1)
node dist/src/run.js \
  --mutationFilter ./mutations/requiredSample_list.json \
  --model anthropic/claude-sonnet-4.6 \
  --attempts 10 \
  --temperature 0.5 \
  --timeout 300 \
  --withTests true
```

Run the corresponding Devstral and Llama configurations by changing `--model`.
Repeat the four principal configurations for Round 2. The Devstral and Llama
configurations with `--withTests true` reproduce supplementary stored results.

Use a distinct output directory for each configuration and round with
`--outDir`, or preserve each output directory before starting the next run.

## Expected Variation

This workflow is not expected to reproduce byte-identical generated tests.
Provider-hosted models, routing, caching, rate limits, and network conditions
can change generated tests, kill counts, token usage, runtime, and cost. The
stored outputs under [`paper_results/`](paper_results/) are the reference record
for the exact results reported in the paper.

## Runtime

The `time` totals in the 12 stored run summaries (3 models × 2 prompt variants
× 2 rounds) sum to 1,643,788 seconds, or approximately 456.6 hours (19.0 days).
The 13-mutant reduced workflow took 3 minutes in the native experiment
environment and 17 minutes in the provided Docker container, a factor of
approximately 5.7. Applying that observed factor gives a rough estimate of
2,587 hours (about 108 days) to repeat all 12 runs sequentially in the Docker
container. This is an extrapolation rather than an end-to-end measurement.
Earlier successes and concurrent configurations can reduce elapsed calendar
time.
