# Contributing to LLMutantKiller

Thank you for your interest in LLMutantKiller. Questions, bug reports,
documentation corrections, and focused implementation improvements are
welcome.

## Before Opening an Issue

- Check the existing [GitHub Issues](https://github.com/neu-se/LLMutantKiller___Artifact/issues)
  for a related report.
- Consult [`README.md`](README.md), [`REPRODUCING.md`](REPRODUCING.md), and
  [`REQUIREMENTS.md`](REQUIREMENTS.md) for setup instructions and known
  limitations.
- For a reproducibility problem, include the host platform, Docker version,
  command, relevant configuration, and complete error message. Remove API keys,
  tokens, and other credentials before posting logs.

## Proposing a Change

1. Open an issue describing the problem or proposed improvement before starting
   a substantial change.
2. Keep changes focused and avoid unrelated formatting or generated-file
   updates.
3. Do not commit `.env` files, API keys, tokens, or other credentials.
4. Use clean clones of subject repositories when exercising LLMutantKiller;
   the runner changes branches and may install dependencies.
5. Explain any proposed change to stored paper results, mutation metadata, or
   manual classifications and preserve the provenance of the original record.

For implementation changes, build the TypeScript project before submitting a
pull request:

```bash
cd source-code
npm ci
npm run build
```

If the change affects execution behavior, describe the command used for
validation and summarize the observed result in the pull request.

## Licensing

By contributing, you agree that your contribution may be distributed under the
terms described in [`LICENSE`](LICENSE).
