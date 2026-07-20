# Reproducibility and Archival Information

## Archived Version

The complete research artifact is archived on Zenodo:

<https://doi.org/10.5281/zenodo.21055452>

The archive preserves the implementation, prompt templates, mutation metadata,
stored experiment outputs, manual labels, aggregate analyses, and TestPilot
baseline results associated with the paper. [`CLAIMS.md`](CLAIMS.md) maps the
paper's research questions, tables, and figures to the corresponding evidence.

## Reproduction Scope

Stored results under [`paper_results/`](paper_results/) can be inspected without
API credentials. The smoke test verifies the packaged implementation without
making LLM calls. Reduced and full live workflows exercise LLMutantKiller using
user-supplied API credentials; see [`README.md`](README.md) and
[`REPRODUCING.md`](REPRODUCING.md) for commands and configurations, and
[`REQUIREMENTS.md`](REQUIREMENTS.md) for requirements, expected runtimes, and
historical cost information.

Live reruns are not expected to produce byte-identical tests or outcomes. The
stored outputs are the reference record for the results reported in the paper.

## Known Limitations

- Live runs require network access and user-supplied credentials for an
  OpenRouter-compatible API.
- Generated tests, kill counts, token usage, cost, and runtime may vary because
  of LLM nondeterminism, provider-side model updates, caching, rate limits, and
  network conditions.
- Full live reproduction is expensive and long-running; inspecting the stored
  evidence or running the reduced workflow is substantially less costly.
- Manual test-validity and mutation-equivalence judgments are available for
  inspection but cannot be regenerated automatically.
- RQ6 is supported by stored TestPilot evidence. TestPilot's execution
  infrastructure is available upstream but is not bundled here.
- The container targets `linux/amd64`. It was tested with Docker on an Apple
  Silicon macOS host; native Linux and Podman were not tested.
