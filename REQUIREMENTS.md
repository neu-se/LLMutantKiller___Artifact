# Artifact Requirements

## Supported Architecture and Container Runtime

The artifact container targets **Linux on the `amd64` architecture**
(`linux/amd64`). The supplied `run-docker.sh` script requests this platform
explicitly.

The artifact has been tested with:

- Docker Engine 23.0.5
- Docker buildx 0.10.4
- macOS 15.6.1 on an Apple M1 Pro host with 16 GB RAM

Docker Desktop uses architecture emulation to run the `linux/amd64` image on
Apple Silicon (`arm64`) hosts. The measured runtimes below include this
emulation overhead.

A Linux host with an `amd64` Docker installation is expected to run the image
natively. Native Linux and Podman have not been tested for this artifact.
`run-docker.sh` uses Docker-specific commands and may require adaptation for
Podman.

## Hardware

No GPU or other non-commodity hardware is required. Model inference is
performed remotely through the OpenRouter API.

- Tested configuration: Apple M1 Pro, 16 GB RAM
- Recommended minimum: 4 logical CPU cores and 8 GB RAM
- Recommended free disk space: 20 GB for downloading, extracting, building,
  cloned subject repositories, installed dependencies, generated results, and
  caches, including full live reproduction

The CPU and RAM recommendations are conservative operational estimates rather
than enforced limits. The workload is primarily limited by network and model
API latency.

## Storage

Approximate storage sizes are:

| Item                             |                 Size |
| -------------------------------- | -------------------: |
| Zenodo archive ZIP               | approximately 1.7 GB |
| Extracted artifact tree          |   approximately 9 GB |
| Built `linux/amd64` Docker image | approximately 1.5 GB |

The values are conservative estimates; actual sizes may be slightly smaller
and may change with minor artifact edits.

Additional working space is needed for the 13 cloned subject repositories,
their npm dependencies, `docker_output/generated_tests`,
`docker_output/llm-cache`, and `docker_output/analysis_outputs`.

## Software

The host requires:

- Docker with support for `docker build` and `docker run`
- Docker buildx is recommended, particularly on Apple Silicon
- Bash
- Git and network access for cloning the prepared subject repositories

Node.js and npm do not need to be installed on the host. The container pins:

- Node.js 20.19.4
- npm 11.5.1
- Debian Bookworm base image

JavaScript dependencies are pinned by `source-code/package-lock.json` and are
installed with `npm ci` while building the image.

## Network Access

Network access is required for the following operations:

1. **Artifact download:** download the archive from Zenodo.
2. **Container build:** retrieve the Node.js base image from Docker Hub,
   Debian packages from Debian mirrors, and npm packages from the npm
   registry.
3. **Subject preparation:** `run-docker.sh` automatically clones the 13
   prepared public benchmark repositories listed in
   `subject_repositories.txt` from GitHub during startup. This took less than
   2 minutes on the tested system; allow up to 15 minutes depending on network
   and GitHub performance.
4. **Subject dependency installation:** live executions may run `npm ci` or
   `npm install` inside subject repositories and therefore access the npm
   registry.
5. **Live LLM execution:** access the configured OpenRouter-compatible chat
   completion endpoint.

Inspection of the stored results under `paper_results/` does not require an
OpenRouter key. Live LLM workflows require an OpenRouter API key with
sufficient credit. Copy `source-code/.env.example` to `source-code/.env` and
provide your own key. A GitHub token is optional for the public benchmark
repositories.

## Expected Runtime

Measured on the tested Apple Silicon/macOS configuration:

| Workflow                                                              |                      Expected runtime |
| --------------------------------------------------------------------- | ------------------------------------: |
| Cold `linux/amd64` Docker build (`--no-cache --pull`)                 |             approximately 174 seconds |
| CLI smoke-test command                                                |               approximately 5 seconds |
| One mutant, one attempt, default Devstral model                       |              approximately 90 seconds |
| Reduced sample: 13 mutants, one attempt each                          |    approximately 17 minutes in Docker |
| Full 12-run experiment, sequential, recorded native execution time    | approximately 456.6 hours (19.0 days) |
| Full 12-run experiment, sequential Docker estimate on the tested host |  approximately 2,587 hours (108 days) |

The full Docker duration is an extrapolation from the observed reduced-run
emulation overhead, not a direct end-to-end measurement. API latency, provider
availability, rate limits, early successful attempts, host architecture, and
parallel execution can materially change runtimes.

## API Expense

The smoke test and stored-result inspection do not make model API calls and
have no model API expense.

The reduced and full live workflows use paid OpenRouter-hosted models. At the
prices recorded for the paper experiments:

- The 13-mutant, one-attempt reduced workflow costs less than USD 1.
- The four principal Round 1 configurations reported in the paper cost
  approximately USD 533.95 in total.
- Applying the experiment-time model rates to all 12 stored runs gives an
  approximate total of USD 1,313.

These historical amounts are not quotes for a new execution. OpenRouter model
prices, caching behavior, token usage, provider routing, and generated outputs
can change. Review current pricing and set an account spending limit before
starting a live run. The 13-mutant reduced workflow provides a practical live
demonstration; the full workflow is not expected to complete within one day.
