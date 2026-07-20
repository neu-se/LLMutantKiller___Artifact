# Artifact Status

## Requested Badges

We apply for the following ISSTA 2026 artifact badges:

- Artifacts Evaluated - Functional
- Artifacts Evaluated - Reusable
- Artifacts Available

## Justification for Functional

This artifact is documented, complete, consistent with the paper, and
exercisable.

**Documented:** The artifact includes comprehensive documentation across
`README.md`, `CLAIMS.md`, `REQUIREMENTS.md`, `STATUS.md`, and
`source-code/README.md`. The documentation covers installation, system
requirements, API configuration, command-line usage, output structure,
reproduction workflows, and a detailed mapping from paper claims to artifact
evidence.

**Complete:** The artifact provides the complete LLMutantKiller implementation,
all prompt templates, mutation metadata for 915 sampled mutants, prepared
benchmark repositories, complete stored experiment outputs from both rounds,
manual validation labels, statistical analysis scripts, and TestPilot baseline
results. Every figure, table, and research question in the paper is supported by
corresponding evidence in the artifact.

**Consistent:** The artifact's stored results directly support the paper's
claims. `CLAIMS.md` provides a claim-by-claim mapping showing where each result
can be found and how it relates to the paper's presentation.

**Exercisable:** The artifact provides multiple exercisable workflows: (1) a
smoke test that completes in under 30 minutes and verifies the installation, (2)
a reduced live workflow that exercises LLMutantKiller on 13 mutants and
completes in under 20 minutes, (3) stored result inspection requiring no API
calls, and (4) full reproduction workflows for all paper experiments. All
workflows are documented with expected runtimes and sample commands.

## Justification for Reusable

This artifact supports inspection and reproduction of the paper's results and
reuse of LLMutantKiller in new JavaScript/TypeScript mutation-testing
scenarios.

The artifact includes:

- a Docker environment with pinned Node.js, npm, and package dependencies;
- a Getting Started workflow and smoke test that complete within 30 minutes;
- reduced and full live-execution workflows;
- the LLMutantKiller implementation, prompt templates, mutation metadata, and
  documented command-line interface under `source-code/`;
- prepared benchmark repositories with upstream revision provenance;
- complete stored outputs for both experimental rounds, including prompts,
  generated tests, chat histories, execution logs, and summary reports;
- manual test-validity and mutation-equivalence labels, cross-run analysis,
  mutation-operator analysis, cost data, and TestPilot baseline evidence;
- `CLAIMS.md`, which maps the paper's figures, tables, and research questions
  to the corresponding artifact evidence and reproduction status;
- documentation of requirements, output structure, result categories, and
  the inputs needed to apply LLMutantKiller to additional projects.

These materials exceed a minimally executable package by supporting both
paper-result inspection and repurposing of the tool for other compatible
JavaScript/TypeScript projects.

## Justification for Available

The artifact is archived in a public archival repository with a DOI:

https://doi.org/10.5281/zenodo.21055452

## Known Limitations

- Live LLM runs require network access and user-supplied credentials for an
  OpenRouter-compatible API.
- Exact generated tests, kill counts, token usage, cost, and runtime may vary
  because of LLM nondeterminism, provider-side model updates, caching, rate
  limits, and network conditions.
- The full live experiment is expensive and long-running, so exact paper
  results are preserved as stored outputs and a reduced workflow is provided
  for artifact evaluation.
- Manual test-validity and mutation-equivalence judgments are provided for
  inspection but cannot be regenerated automatically.
- RQ6 is supported by stored TestPilot evidence; TestPilot's execution
  infrastructure is available upstream but is not bundled in this artifact.
- The container targets `linux/amd64`. It was tested with Docker on an Apple
  Silicon macOS host; native Linux and Podman were not tested.
