# LLMutantKiller Artifact

This repository is the public paper companion and replication package for
**LLMutantKiller: Using Large Language Models to Generate Tests that Kill
Mutants**. It contains the LLMutantKiller implementation, Docker packaging,
mutation metadata, prepared benchmark provenance, complete stored experiment
outputs, evaluation materials, and TestPilot baseline results.

See [`REPRODUCIBILITY.md`](REPRODUCIBILITY.md) for the reproduction scope and
known limitations.

## Paper Reference

Farideh Khalili, Aidan Domondon, Harshit Garg, and Frank Tip. 2026.
**LLMutantKiller: Using Large Language Models to Generate Tests That Kill
Mutants.** _Proc. ACM Softw. Eng. 3, ISSTA_, Article ISSTA007 (October 2026),
23 pages. <https://doi.org/10.1145/3832098>

If you use LLMutantKiller or these research materials, please cite the paper
above.

## What LLMutantKiller Does

LLMutantKiller takes a JavaScript or TypeScript project and a description of a
surviving mutant, including the affected file and the original and mutated code
fragments. It asks an LLM to generate a Jest test, checks that the candidate
passes on the original program and fails on the mutant, and provides targeted
feedback to the LLM when an attempt is invalid or ineffective. It outputs
mutant-killing tests together with the prompts, chat histories, execution logs,
and reports needed to inspect each attempt.

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
| [`REPRODUCING.md`](REPRODUCING.md)                     | Detailed instructions and configurations for full live reproduction.                                                               |
| [`REPRODUCIBILITY.md`](REPRODUCIBILITY.md)             | Reproduction scope, preserved evidence, and known limitations.                                                                      |
| [`CITATION.cff`](CITATION.cff)                         | Citation metadata for the repository and its associated paper.                                                                     |
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

Live runs use credentials supplied by the user. Copy the sanitized example
configuration and add your own OpenRouter API key:

```bash
cd source-code
cp .env.example .env
# Edit .env and set OPENROUTER_API_KEY.
cd ..
./run-docker.sh
```

Live LLMutantKiller runs require an OpenRouter-compatible chat completion endpoint.
Stored-result inspection and the smoke test do not make API calls.

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

Full live reproduction runs the paper configurations on the complete sampled
set of surviving mutants. It requires paid API access and substantial runtime,
and live results will not be byte-identical because hosted LLMs are
nondeterministic. See [`REPRODUCING.md`](REPRODUCING.md) for the complete model
matrix, commands, parameters, and runtime estimates. The stored outputs in
`paper_results/` remain the reference record for the exact paper results.

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

The default model (`mistralai/devstral-2512`) can be used as-is, or you can select any OpenRouter-compatible model via the `--model` option. You can also experiment with different configurations using `--temperature` (default 0.5), `--attempts` (default 10), and `--timeout` (default 300 seconds).

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
