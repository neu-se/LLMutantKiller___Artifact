# LLMutantKiller Artifact

This artifact accompanies the paper **LLMutantKiller: Using Large Language
Models to Generate Tests that Kill Mutants**. It contains the LLMutantKiller
implementation, Docker packaging, mutation metadata, prepared benchmark
provenance, complete stored experiment outputs, evaluation artifacts, and
TestPilot baseline results.

The artifact is intended to support the **Artifacts Evaluated - Reusable** and
**Artifacts Available** badges. See [`STATUS.md`](STATUS.md) for the badge
request, justification, and limitations.

## Artifact Contents

| Path                                                   | Purpose                                                                                                                            |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| [`source-code/`](source-code/)                         | LLMutantKiller implementation, prompt templates, mutation metadata, CLI documentation, and package files.                          |
| [`paper_results/`](paper_results/)                     | Stored experiment outputs, generated tests, logs, manual labels, aggregate analyses, and TestPilot baseline results.               |
| [`subject_repositories.md`](subject_repositories.md)   | Prepared benchmark repositories and original upstream revision provenance.                                                         |
| [`subject_repositories.txt`](subject_repositories.txt) | Repository URLs cloned automatically by `run-docker.sh`.                                                                           |
| [`Dockerfile`](Dockerfile)                             | Container definition for the runnable LLMutantKiller environment.                                                                  |
| [`run-docker.sh`](run-docker.sh)                       | Convenience script that builds the image and starts an interactive container with persistent host-mounted output directories.      |
| [`CLAIMS.md`](CLAIMS.md)                               | Claim-by-claim map from the paper's research questions and tables to artifact evidence, expected results, and reproduction status. |
| [`REQUIREMENTS.md`](REQUIREMENTS.md)                   | Tested platform, container runtime, hardware, storage, network, runtime, and API-expense requirements.                             |
| [`STATUS.md`](STATUS.md)                               | Requested badges, reusable-badge rationale, available-badge DOI, and known limitations.                                            |
| [`LICENSE`](LICENSE)                                   | License terms for software, data, documentation, and third-party material.                                                         |

## Quick Start

This path checks that the container builds and that the LLMutantKiller command
line is available. It does not require an OpenRouter API key because it does
not generate new tests. Startup requires internet access because
`run-docker.sh` builds the image and automatically clones the 13 prepared
public benchmark repositories from GitHub. Repository cloning is expected to
take less than 2 minutes on the tested system; allow up to 15 minutes depending
on network and GitHub performance.

From the artifact root:

```bash
./run-docker.sh
```

The script builds the `llmutantkiller-artifact` Docker image, clones repositories
listed in [`subject_repositories.txt`](subject_repositories.txt) when they are
not already present, and opens an interactive shell at `/usr/src/app/`. It also
creates host-side persistent directories under `docker_output/`:

```text
docker_output/
├── analysis_outputs/
├── generated_tests/
├── llm-cache/
└── subject_repositories/
```

Inside the container, run:

```bash
cd /usr/src/app/source-code
node --version
npm --version
node dist/src/run.js --help
```

Expected version output:

```text
v20.19.4
11.5.1
```

The final command should print the LLMutantKiller command-line options and exit
without an error. The options are documented in the source-code README's
[`Core Arguments`](source-code/README.md#core-arguments) section. This is the
recommended first installation check.

## API Access

Stored results under [`paper_results/`](paper_results/) can be inspected without
API credentials.

The artifact includes a preconfigured reviewer key in
[`source-code/.env`](source-code/.env). The key has a USD 10 usage limit and is
intended for the reduced artifact-evaluation workflow. To use your own
credentials instead:

```bash
cd source-code
cp .env.example .env
# Edit .env and set OPENROUTER_API_KEY.
cd ..
./run-docker.sh
```

Live LLMutantKiller runs require an OpenRouter-compatible chat completion
endpoint. Stored-result inspection and the smoke test do not make API calls.

The supported environment variables, defaults, alternative authentication
method, and optional GitHub token are documented in the source-code README's
[`API Configuration`](source-code/README.md#api-configuration) section.

## Usage and Reproduction Workflows

### Workflow 1: Smoke Test

Follow [Quick Start](#quick-start). This verifies the container, installed Node
and npm versions, TypeScript build output, and LLMutantKiller CLI entry point.

Measured on macOS 15.6.1 with an Apple M1 Pro CPU, 16 GB RAM, Docker 23.0.5,
and buildx 0.10.4, a cold `linux/amd64` Docker build using `--no-cache --pull`
completed in 174 seconds, including retrieval and extraction of the Node.js
base image layers. The smoke-test command completed in 5 seconds and printed
Node.js `v20.19.4`, npm `11.5.1`, and the LLMutantKiller CLI help text. The
Getting Started path is therefore expected to complete comfortably within 30
minutes on a Docker-capable machine; Apple Silicon runs the `linux/amd64` image
through Docker emulation.

### Workflow 2: Reduced Live Run

This workflow exercises LLMutantKiller on a small sample. It requires API
credentials. The prepared subject repositories are cloned automatically from
[`subject_repositories.txt`](subject_repositories.txt) by `run-docker.sh`.

Then run one known mutation:

```bash
cd /usr/src/app/source-code
node dist/src/run.js \
  --projectPath ../subject_repositories/zip-a-folder \
  --mutationId mutant-2a53823848761e41b96dc87df8df27054ee4b80d \
  --attempts 1
```

For a broader but still small sample, use:

```bash
cd /usr/src/app/source-code
node dist/src/run.js \
  --mutationFilter ./mutations/reducedTestSample_list.json \
  --attempts 1
```

Using the default `mistralai/devstral-2512` model inside the provided Docker
container, the single-mutant command completed in approximately 90 seconds.
The reduced sample, which contains one randomly selected mutant from each of
the 13 subject repositories, completed in approximately 17 minutes. These
measurements indicate a runtime of roughly one to two minutes per mutant for
this one-attempt workflow. Runtime may vary with API latency, network
conditions, and model-provider availability.

Generated outputs are written to `source-code/generated_tests/` inside the
container and persist on the host under `docker_output/generated_tests/`.

Because this workflow makes live LLM calls, exact generated tests and outcomes
may differ from the stored paper results.

Additional invocation patterns are documented in the source-code README's
[`Usage Examples`](source-code/README.md#-usage-examples) section.

### Workflow 3: Validate Stored Paper Results

The exact outputs used in the paper are stored under
[`paper_results/`](paper_results/) and can be inspected without API
credentials. See [`CLAIMS.md`](CLAIMS.md) for the claim-by-claim mapping of
research questions and paper tables to stored evidence, expected results, and
available recomputation procedures.

### Workflow 4: Full Live Reproduction

For full reproduction of the results reported in the paper, run LLMutantKiller
on the 915 randomly sampled surviving mutants listed in
`source-code/mutations/requiredSample_list.json`, which are drawn from the 13
subject applications listed in
[`subject_repositories.md`](subject_repositories.md). Tables 2–5 use four
principal configurations: Claude Sonnet 4.6 with and without existing tests,
Devstral 2512 without tests, and Llama 3.3 70B without tests. Repeat those four
configurations as Round 2 to reproduce the paper's nondeterminism analysis.
The stored results additionally include supplementary Devstral and Llama runs
with existing tests in both rounds. Reproducing every stored principal and
supplementary result therefore requires six configurations per round.

All configurations use 10 attempts per mutant (`--attempts 10`), temperature
0.5 (`--temperature 0.5`), and a 300-second timeout per attempt
(`--timeout 300`), consistent with the paper.

To reproduce all stored principal and supplementary results, each round has
six configurations:

- **3 models** (controlled via `--model`):
  - `anthropic/claude-sonnet-4.6`
  - `mistralai/devstral-2512`
  - `meta-llama/llama-3.3-70b-instruct`

- **2 prompt variants** (controlled via `--withTests`):
  - `--withTests false` (excludes existing test suite from initial prompt)
  - `--withTests true` (includes existing test suite in initial prompt)

Example commands for one configuration:

```bash
cd /usr/src/app/source-code

# Claude Sonnet 4.6, without tests (replicates Table 2, Round 1)
node dist/src/run.js \
  --mutationFilter ./mutations/requiredSample_list.json \
  --model anthropic/claude-sonnet-4.6 \
  --attempts 10 \
  --temperature 0.5 \
  --timeout 300 \
  --withTests false

# Claude Sonnet 4.6, with tests (replicates Table 3, Round 1)
node dist/src/run.js \
  --mutationFilter ./mutations/requiredSample_list.json \
  --model anthropic/claude-sonnet-4.6 \
  --attempts 10 \
  --temperature 0.5 \
  --timeout 300 \
  --withTests true

# Run Devstral and Llama without tests for Tables 4 and 5.
# Repeat the four principal configurations for the Round 2 analysis.
# The Devstral/Llama with-tests configurations are supplementary.
```

This workflow requires paid API access and substantial runtime. It is not expected to reproduce byte-identical generated tests because provider-hosted LLMs and API infrastructure are nondeterministic. The stored outputs in `paper_results/` are the reference record for the exact paper results.

The `time` totals in the 12 stored run summaries (3 models × 2 prompt configurations × 2 rounds) sum to 1,643,788 seconds, or approximately 456.6 hours (19.0 days). The 13-mutant reduced workflow took 3 minutes in the native environment used for the experiments and 17 minutes in the provided Docker container, a factor of approximately 5.7. Applying that observed factor gives a rough estimate of 2,587 hours (about 108 days) to repeat all 12 runs sequentially in the Docker container. API and network conditions may change this estimate. Furthemore, earlier attempt successes and running configurations concurrently can reduce elapsed calendar time.

## Running LLMutantKiller

The detailed tool manual is [`source-code/README.md`](source-code/README.md).
It documents setup, CLI arguments, environment variables, mutation filters,
result categories, output layout, and examples.

The core command form is:

```bash
cd /usr/src/app/source-code
node dist/src/run.js [options]
```

Common examples:

```bash
# Run one mutation from one prepared subject repository.
node dist/src/run.js \
  --projectPath ../subject_repositories/zip-a-folder \
  --mutationId mutant-2a53823848761e41b96dc87df8df27054ee4b80d

# Run selected projects using the default required sample.
node dist/src/run.js --projects zip-a-folder,countries-and-timezones

# Run selected projects using a small reduced sample.
node dist/src/run.js \
  --projects countries-and-timezones \
  --mutationFilter ./mutations/reducedTestSample_list.json
```

LLMutantKiller changes branches inside subject repositories while executing
tests. Use clean clones of the prepared repositories listed in
[`subject_repositories.md`](subject_repositories.md).

## Reuse

This artifact is designed to be reusable beyond the paper's experiments. To apply LLMutantKiller to a new JavaScript or TypeScript project, you need to provide:

1. **Subject repository with mutation branches**:
   - Add the repository URL to [`subject_repositories.txt`](subject_repositories.txt)
   - The repository must have:
     - A `main` branch containing the original (unmutated) code
     - One branch per mutant, named `mutant-<id>` (e.g., `mutant-abc1234...`)
     - Each mutant branch should contain the code with one mutation applied

2. **Mutation metadata files**:
   - Create one JSON file per mutation under `source-code/mutations/<projectName>/`
   - Each file must be named `mutant-<id>.json` (matching the branch name)
   - See the [`Mutations: Layout & Examples`](source-code/README.md#-mutations-layout--examples) for the required JSON format and field descriptions. The `mutatorName` and `strykerMutationId` fields are used only for analyzing the statistical association between mutation operator types and valid-kill outcomes; these fields can be omitted or left empty if your mutations are generated by a different tool

3. **Mutation filter file**:
   - Create a JSON file mapping your project name to a list of mutation IDs
   - See the [`Mutation Filters`](source-code/README.md#-mutation-filters) for the format and examples
   - Use this file with the `--mutationFilter` argument

4. **Prompt context files** (optional, needed only when using `--withTests true`):
   - `source-code/templates/subject_tests/<projectName>.txt`: Excerpts from your project's existing test suite to provide style and structure examples for the LLM
   - `source-code/templates/subject_allowed_libraries/<projectName>.txt`: List of third-party libraries already used in your project's test suite (one per line), restricting the LLM to use only these libraries
   - These files are included in the initial prompt only when `--withTests true` is specified, helping the LLM generate tests consistent with your project's testing conventions and dependencies

The default model (`mistralai/devstral-2512`) can be used as-is, or you can select any OpenRouter-compatible model via the `--model` option. You can also experiment with different configurations using `--temperature` (default 0.2), `--attempts` (default 2), and `--timeout` (default 60 seconds).

The output structure is stable across all experiments: generated tests, prompts, logs, chat histories, per-attempt metadata, and aggregate reports are written to `generated_tests/`. See the [`Directory Structure`](source-code/README.md#-directory-structure) for the exact output structure.

## Paper Claims and Artifact Evidence

[`CLAIMS.md`](CLAIMS.md) maps each research question, paper table and figure to its
artifact inputs, stored evidence, expected result, and current reproduction
status. It also states which claims cannot be reproduced exactly through a
live run because the provider-hosted LLMs are nondeterministic.

The claim matrix is the authoritative paper-to-artifact map. The main evidence
collections referenced by it are:

- subject and sample provenance in
  [`subject_repositories.md`](subject_repositories.md) and
  [`source-code/mutations/`](source-code/mutations/);
- implementation and prompts in [`source-code/src/`](source-code/src/) and
  [`source-code/templates/`](source-code/templates/);
- raw and summarized LLMutantKiller runs in
  [`paper_results/Experiment Results/`](paper_results/Experiment%20Results/);
- manual validation and aggregate analyses in
  [`paper_results/Evaluation/`](paper_results/Evaluation/); and
- TestPilot inputs and results in
  [`paper_results/testpilot_benchmark/`](paper_results/testpilot_benchmark/).

## Limitations

- Live runs require OpenRouter-compatible API access.
- LLM outputs are nondeterministic, so live reruns may differ from the stored
  paper outputs.
- Provider-side model changes, rate limits, network behavior, and pricing can
  affect generated tests, runtime, and cost.
- Full live reproduction is substantially more expensive than inspecting the
  stored evidence and running the reduced workflow.
- Subject repositories are modified during execution through branch checkouts
  and dependency installation. Use clean clones.
