# Claims

This artifact supports the 6 figures, 7 tables, and 7 research questions presented in the paper. For each item below, we provide:

1. **Location**: Where to find the evidence in the artifact
2. **Interpretation**: How to read or validate it (if needed)
3. **Reproduction**: How to reproduce it, or why exact reproduction is not possible

Unless a section explicitly says otherwise, the files checked into this
repository are the authoritative archived evidence. Google Sheets links are
provided only as convenient browser-based views and are not required to inspect
or validate the results.

---

## Figure 1: Overview of LLMutantKiller Approach

**Location**: The complete implementation is in [`source-code/src/`](source-code/src/), with the main entry point at [`source-code/src/run.ts`](source-code/src/run.ts). The workflow shown in Figure 1 (prompt generator → LLM → candidate test → validator → verdict) is implemented across multiple modules.

**Interpretation**: The figure is a conceptual diagram. The artifact provides the actual implementation that realizes this workflow.

**Reproduction**: Run the smoke test (Workflow 1 in the main README) to verify the implementation executes: `./run-docker.sh` then `node dist/src/run.js --help`.

---

## Figure 2: Prompt Templates (System and Initial Prompts)

**Location**:

- System prompt template: [`source-code/templates/systemPrompt.hb`](source-code/templates/systemPrompt.hb)
- Initial prompt without tests: [`source-code/templates/initialPrompt.hb`](source-code/templates/initialPrompt.hb)
- Initial prompt with tests: [`source-code/templates/initialPromptWithTestCases.hb`](source-code/templates/initialPromptWithTestCases.hb)
- Example of rendered prompts: Any `chatHistory.json` file under `paper_results/Experiment Results/..*../artifacts/` includes these templates compiled with actual mutation data (e.g., the same file referenced in Figure 5)

**Interpretation**: The Handlebars templates show the prompt structure with variables in triple braces (e.g., `{{{mutationObj.file}}}`). To see how these templates are rendered with actual mutation data, inspect any `chatHistory.json` file, which contains the complete conversation including the compiled system and initial user prompts sent to the LLM.

**Reproduction**: The templates are static files and can be inspected directly. The rendered prompts in `chatHistory.json` files vary by mutation but follow the same template structure.

---

## Figure 3: Mutation Metadata Example

**Location**: Mutation metadata JSON files are in [`source-code/mutations/`](source-code/mutations/) subdirectories, organized by project.

The paper's Figure 3 shows:

- Part (a) - Mutation metadata: [`source-code/mutations/pull-stream/mutant-8303b1ee6abe6379f38603bb827f1f4f83b6f97d.json`](source-code/mutations/pull-stream/mutant-8303b1ee6abe6379f38603bb827f1f4f83b6f97d.json)
- Part (b) - Example compiled initial prompt (excerpt): [`paper_results/Experiment Results/Round 1/meta-llama_llama-3.3-70b-instruct/temp_0.5/withTests/2026-04-28_18-10/artifacts/pull-stream/attempt_1/fail_fail_on_original/mutant-8303b1e/prompt_1.txt`](paper_results/Experiment%20Results/Round%201/meta-llama_llama-3.3-70b-instruct/temp_0.5/withTests/2026-04-28_18-10/artifacts/pull-stream/attempt_1/fail_fail_on_original/mutant-8303b1e/prompt_1.txt)

**Interpretation**: Each JSON file specifies one mutation. See the [`Mutations: Layout & Examples`](source-code/README.md#-mutations-layout--examples) for the complete format specification. Part (b) of the figure shows an excerpt from a compiled initial prompt where this mutation's metadata was used to generate the actual prompt sent to the LLM.

**Reproduction**: The mutation metadata is static and can be inspected directly. The compiled prompts vary by configuration (with or without existing test cases) but show how the metadata is used.

---

## Figure 4: Re-prompting Templates for Failure Categories

**Location**: Retry templates with placeholders:

- Syntax error: [`source-code/templates/retry_fail_syntax_error.hb`](source-code/templates/retry_fail_syntax_error.hb)
- Forbidden libraries: [`source-code/templates/retry_fail_forbidden_libraries.hb`](source-code/templates/retry_fail_forbidden_libraries.hb)
- Fail on original: [`source-code/templates/retry_fail_fail_on_original.hb`](source-code/templates/retry_fail_fail_on_original.hb)
- Pass on mutation: [`source-code/templates/retry_fail_pass_on_mutation.hb`](source-code/templates/retry_fail_pass_on_mutation.hb)

**Interpretation**: The templates show how LLMutantKiller provides diagnostic feedback for each failure type in subsequent attempts.

**Reproduction**: The templates are static files and can be inspected directly. The compiled re-prompts follow the same template structure.

---

## Figure 5: Example Conversation Trace (node-geo-point)

**Location**: [`paper_results/Experiment Results/Round 1/meta-llama_llama-3.3-70b-instruct/temp_0.5/withTests/2026-04-28_18-10/artifacts/node-geo-point/attempt_3/successful/mutant-39985ea/chatHistory.json`](paper_results/Experiment%20Results/Round%201/meta-llama_llama-3.3-70b-instruct/temp_0.5/withTests/2026-04-28_18-10/artifacts/node-geo-point/attempt_3/successful/mutant-39985ea/chatHistory.json)

**Interpretation**: This JSON file contains the full conversation history showing how the LLM iteratively generated a test that killed the mutant after two failed attempts. Figure 5 in the paper shows an excerpt extracted from this file.

**Reproduction**: This is a specific example from the stored runs. A live run would produce a different conversation due to LLM nondeterminism.

---

## Figure 6: Example Behaviorally Invalid Test (crawler-url-parser)

**Location**: The specific example shown in Figure 6 originates from preliminary experiments conducted prior to the systematic evaluation reported in the paper and is not present in this artifact's stored results. However, analogous examples of behaviorally invalid tests can be found by consulting the manual test validation results:

- HTML validation table: [`paper_results/Evaluation/Test Validation results/round1.html`](paper_results/Evaluation/Test%20Validation%20results/round1.html) (or [Google Sheets version](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=139435814#gid=139435814))
- Tests marked "Invalid" in the "Final Verdict" column are behaviorally invalid
- Example: Row 209 (mutant-7f88a67) corresponds to [`paper_results/Experiment Results/Round 1/anthropic_claude-sonnet-4.6/temp_0.5/withoutTests/2026-04-28_21-23/artifacts/crawler-url-parser/attempt_8/successful/mutant-7f88a67/testCase.test.ts`](paper_results/Experiment%20Results/Round%201/anthropic_claude-sonnet-4.6/temp_0.5/withoutTests/2026-04-28_21-23/artifacts/crawler-url-parser/attempt_8/successful/mutant-7f88a67/testCase.test.ts)

**Interpretation**: Figure 6 illustrates how some LLM-generated tests kill mutants by inspecting implementation details (e.g., checking string representations via `toString()`) rather than exercising observable behavior through the public API. Such tests are classified as behaviorally invalid.

**Reproduction**: The artifact contains multiple examples of invalid tests identified during manual test validation. Evaluators can inspect any test marked "Invalid" in the validation results to observe similar patterns. Due to LLM nondeterminism, live runs will not reproduce the exact same invalid tests, but may produce different instances of behaviorally invalid tests.

---

## Table 1: Subject Applications

**Claim**: Table 1 presents 13 JavaScript/TypeScript open-source projects with their characteristics: weekly npm downloads, lines of code, number of tests, statement and branch coverage, mutation coverage, total mutations generated by StrykerJS, and surviving mutants. The evaluation uses a random sample of 915 surviving mutants from these projects.

**Location**:

- Repository URLs, commits, and provenance: [`subject_repositories.md`](subject_repositories.md)
- StrykerJS mutation testing reports: [`paper_results/StrykerOutput/`](paper_results/StrykerOutput/) — contains HTML reports with total mutations and surviving mutation counts per project
- Complete population of surviving mutants: [`source-code/mutations/all_mutant_ids_list.json`](source-code/mutations/all_mutant_ids_list.json) — lists all surviving mutant IDs from StrykerJS across all 13 projects, serving as the population from which the sample was drawn
- Sample of 915 mutants: [`source-code/mutations/requiredSample_list.json`](source-code/mutations/requiredSample_list.json) — maps each project to its randomly sampled mutation IDs, showing the per-project distribution
- Sample size calculations: [Google Sheets](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=1155364924#gid=1155364924) — shows Cochran's formula calculations (95% confidence level, ±5% margin of error, conservative p = 0.5) with finite population correction to determine the statistically appropriate sample size per project

**Interpretation**:

- Weekly downloads were collected from npm at the time of subject selection
- LOC (lines of code) was measured using standard code counting tools (e.g., `npx sloc`) for production source code (typically main source files or `src/` directories, excluding tests and node_modules)
- Number of tests was extracted from test framework output when running each project's test suite
- Statement and branch coverage were measured using coverage tools (Jest with built-in coverage for some projects, or nyc wrapping the test command for others)
- Total mutations and surviving mutations come from StrykerJS reports in `paper_results/StrykerOutput/`
- The 915-mutant sample was randomly selected from the population of surviving mutants listed in `all_mutant_ids_list.json`. Sample sizes per project were determined using Cochran's formula with finite population correction (95% confidence, ±5% margin of error, p = 0.5)
- `subject_repositories.md` documents the exact commit used for each project

**Reproduction**:

- The subject list, commit versions, and mutant sample are static and can be inspected directly
- StrykerJS reports are stored and can be verified against the table. Re-running StrykerJS v9.6.1 with the same environment (Node v20.19.4, subject commits) will produce identical mutation results
- Table 1 aggregates data from multiple sources (npm, StrykerJS, code metrics) and was constructed manually for the paper

---

## RQ1: How effective is LLMutantKiller at generating tests that kill mutants?

### Table 2: Mutants Killed by Claude Sonnet 4.6

**Claim**: LLMutantKiller kills 811 of 915 mutants with the default configuration (Claude Sonnet 4.6, without tests). After manual validation and excluding equivalent mutants, 777 of 815 non-equivalent mutants are killed by valid tests (95.3% effectiveness).

**Location**:

- Raw results (Round 1): [`paper_results/Experiment Results/Round 1/anthropic_claude-sonnet-4.6/temp_0.5/withoutTests/2026-04-28_21-23/reports/summary.txt`](paper_results/Experiment%20Results/Round%201/anthropic_claude-sonnet-4.6/temp_0.5/withoutTests/2026-04-28_21-23/reports/summary.txt)
- Manual test validation labels and inter-rater reliability metrics: [`paper_results/Evaluation/Test Validation results/round1.html`](paper_results/Evaluation/Test%20Validation%20results/round1.html) (or [Google Sheets version](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=139435814#gid=139435814))
- Mutation equivalence labels and inter-rater reliability metrics: [`paper_results/Evaluation/mutationEquivalence.html`](paper_results/Evaluation/mutationEquivalence.html) (or [Google Sheets version](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=1224837914#gid=1224837914))
- Average tests per successful mutant (1.94): [`paper_results/Evaluation/avgTestCasePerSuccessfulMutant.html`](paper_results/Evaluation/avgTestCasePerSuccessfulMutant.html) (or [Google Sheets version](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=1830472566#gid=1830472566))
- Manual tests for non-equivalent mutants that LLMutantKiller failed to kill: [`paper_results/non-equivalent mutations testCases/`](paper_results/non-equivalent%20mutations%20testCases/)

**Interpretation**:

- `summary.txt` shows per-project kills across 10 attempts
- The validation tables show which kills were judged valid vs. invalid by human annotators, along with inter-rater reliability metrics
- The equivalence tables show which mutants were judged equivalent vs. non-equivalent, along with inter-rater reliability metrics
- The adjusted effectiveness (777/815 = 95.3%) comes from: (raw kills - invalid-only kills)/(non-equivalent mutants)

**Reproduction**:

- Stored results can be inspected directly
- Live reproduction requires running: `node dist/src/run.js --mutationFilter ./mutations/requiredSample_list.json --model anthropic/claude-sonnet-4.6 --attempts 10 --temperature 0.5 --withTests false`
- Exact results cannot be reproduced due to LLM nondeterminism; expect similar but not identical success counts. Round 2 results ([`paper_results/Experiment Results/Round 2/anthropic_claude-sonnet-4.6/temp_0.5/withoutTests/2026-04-29_23-38/reports/summary.txt`](paper_results/Experiment%20Results/Round%202/anthropic_claude-sonnet-4.6/temp_0.5/withoutTests/2026-04-29_23-38/reports/summary.txt)) and pairwise agreement analysis ([`paper_results/Evaluation/twoRunResultsAggregated.html`](paper_results/Evaluation/twoRunResultsAggregated.html) or [Google Sheets version](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=1132907401#gid=1132907401)) demonstrate the degree of variation across independent runs
- Manual test validation and equivalence classification cannot be automated; however, the stored classifications can be inspected and verified by evaluators

---

## RQ2: How does including existing tests in the prompt affect effectiveness?

### Table 3: Mutants Killed by Claude Sonnet 4.6 With Existing Tests

**Claim**: Including existing tests changes which mutants are killed but does not improve overall effectiveness. Claude with tests kills 797 mutants (vs. 811 without tests). The overlap analysis shows 742 mutants killed by both configurations, 35 only without tests, and 21 only with tests (union of 798).

**Location**:

- Raw results (Round 1, with tests): [`paper_results/Experiment Results/Round 1/anthropic_claude-sonnet-4.6/temp_0.5/withTests/2026-04-28_17-58/reports/summary.txt`](paper_results/Experiment%20Results/Round%201/anthropic_claude-sonnet-4.6/temp_0.5/withTests/2026-04-28_17-58/reports/summary.txt)
- Raw results (Round 1, without tests): (same as Table 2) [`paper_results/Experiment Results/Round 1/anthropic_claude-sonnet-4.6/temp_0.5/withoutTests/2026-04-28_21-23/reports/summary.txt`](paper_results/Experiment%20Results/Round%201/anthropic_claude-sonnet-4.6/temp_0.5/withoutTests/2026-04-28_21-23/reports/summary.txt)
- Manual test validation labels and inter-rater reliability metrics: (same as RQ1 and Table 2) [`paper_results/Evaluation/Test Validation results/round1.html`](paper_results/Evaluation/Test%20Validation%20results/round1.html) (or [Google Sheets version](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=139435814#gid=139435814))
- Mutation equivalence labels and inter-rater reliability metrics: (same as RQ1 and Table 2) [`paper_results/Evaluation/mutationEquivalence.html`](paper_results/Evaluation/mutationEquivalence.html) (or [Google Sheets version](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=1224837914#gid=1224837914))
- Success matrix showing per-mutant outcomes across configurations: [`paper_results/Evaluation/twoRunResultsAggregated.html`](paper_results/Evaluation/twoRunResultsAggregated.html) (or [Google Sheets version](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=1132907401#gid=1132907401))

**Interpretation**:

- Compare the two summary files to see per-project differences between with-tests and without-tests configurations
- The validation and equivalence tables contain classifications for both configurations
- The success matrix displays kill outcomes for each mutant across all configurations, showing which mutants were killed with tests, without tests, both, or neither

**Reproduction**:

- Stored results can be inspected directly
- Live reproduction: same command as RQ1 but with `--withTests true`
- Exact results cannot be reproduced due to LLM nondeterminism. Round 2 results ([`paper_results/Experiment Results/Round 2/anthropic_claude-sonnet-4.6/temp_0.5/withTests/2026-04-29_17-41/reports/summary.txt`](paper_results/Experiment%20Results/Round%202/anthropic_claude-sonnet-4.6/temp_0.5/withTests/2026-04-29_17-41/reports/summary.txt)) and pairwise agreement analysis ([`paper_results/Evaluation/twoRunResultsAggregated.html`](paper_results/Evaluation/twoRunResultsAggregated.html) or [Google Sheets version](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=1132907401#gid=1132907401)) demonstrate the degree of variation across independent runs
- Manual test validation and equivalence classification cannot be automated; however, the stored classifications can be inspected and verified by evaluators

---

## RQ3: How does LLMutantKiller's effectiveness depend on the underlying LLM?

### Table 4: Mutants Killed by Mistral Devstral 2512

### Table 5: Mutants Killed by Llama 3.3 70B

**Claim**: Effectiveness varies by model. Without tests, Claude kills 811 mutants, Devstral kills 510, and Llama kills 218. After manual validation, valid tests kill 777, 509, and 216 non-equivalent mutants respectively.

**Location**:

- Raw results (Round 1, Devstral): [`paper_results/Experiment Results/Round 1/mistralai_devstral-2512/temp_0.5/withoutTests/2026-04-28_18-22/reports/summary.txt`](paper_results/Experiment%20Results/Round%201/mistralai_devstral-2512/temp_0.5/withoutTests/2026-04-28_18-22/reports/summary.txt)
- Raw results (Round 1, Llama): [`paper_results/Experiment Results/Round 1/meta-llama_llama-3.3-70b-instruct/temp_0.5/withoutTests/2026-04-28_23-32/reports/summary.txt`](paper_results/Experiment%20Results/Round%201/meta-llama_llama-3.3-70b-instruct/temp_0.5/withoutTests/2026-04-28_23-32/reports/summary.txt)
- Raw results (Round 1, Claude): (same as Table 2) [`paper_results/Experiment Results/Round 1/anthropic_claude-sonnet-4.6/temp_0.5/withoutTests/2026-04-28_21-23/reports/summary.txt`](paper_results/Experiment%20Results/Round%201/anthropic_claude-sonnet-4.6/temp_0.5/withoutTests/2026-04-28_21-23/reports/summary.txt)
- Manual test validation labels and inter-rater reliability metrics: (same as RQ1 and Table 2) [`paper_results/Evaluation/Test Validation results/round1.html`](paper_results/Evaluation/Test%20Validation%20results/round1.html) (or [Google Sheets version](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=139435814#gid=139435814))
- Mutation equivalence labels and inter-rater reliability metrics: (same as RQ1 and Table 2) [`paper_results/Evaluation/mutationEquivalence.html`](paper_results/Evaluation/mutationEquivalence.html) (or [Google Sheets version](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=1224837914#gid=1224837914))

**Interpretation**:

- Compare the three summary files to see model differences. Tables 2, 4, and 5 in the paper present these results side by side
- The validation and equivalence tables contain classifications for all three models

**Reproduction**:

- Stored results can be inspected directly
- Live reproduction for Devstral: `node dist/src/run.js --mutationFilter ./mutations/requiredSample_list.json --model mistralai/devstral-2512 --attempts 10 --temperature 0.5 --withTests false`
- Live reproduction for Llama: `node dist/src/run.js --mutationFilter ./mutations/requiredSample_list.json --model meta-llama/llama-3.3-70b-instruct --attempts 10 --temperature 0.5 --withTests false`
- Exact results cannot be reproduced due to LLM nondeterminism. Round 2 results for Devstral ([`paper_results/Experiment Results/Round 2/mistralai_devstral-2512/temp_0.5/withoutTests/2026-04-29_10-13/reports/summary.txt`](paper_results/Experiment%20Results/Round%202/mistralai_devstral-2512/temp_0.5/withoutTests/2026-04-29_10-13/reports/summary.txt)) and Llama ([`paper_results/Experiment Results/Round 2/meta-llama_llama-3.3-70b-instruct/temp_0.5/withoutTests/2026-04-29_10-09/reports/summary.txt`](paper_results/Experiment%20Results/Round%202/meta-llama_llama-3.3-70b-instruct/temp_0.5/withoutTests/2026-04-29_10-09/reports/summary.txt)) and pairwise agreement analysis ([`paper_results/Evaluation/twoRunResultsAggregated.html`](paper_results/Evaluation/twoRunResultsAggregated.html) or [Google Sheets version](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=1132907401#gid=1132907401)) demonstrate the degree of variation across independent runs
- Manual test validation and equivalence classification cannot be automated; however, the stored classifications can be inspected and verified by evaluators

---

## RQ4: How often does LLMutantKiller produce behaviorally invalid tests?

**Claim**: Behaviorally invalid tests are rare. No configuration kills more than 3.7% of mutants exclusively through invalid tests.

**Location**:

- Manual test validation labels and inter-rater reliability metrics: (same as RQ1 and Table 2) [`paper_results/Evaluation/Test Validation results/round1.html`](paper_results/Evaluation/Test%20Validation%20results/round1.html) (or [Google Sheets version](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=139435814#gid=139435814))
- Mutation equivalence labels and inter-rater reliability metrics: [`paper_results/Evaluation/mutationEquivalence.html`](paper_results/Evaluation/mutationEquivalence.html) (or [Google Sheets version](https://docs.google.com/spreadsheets/d/17b4HRTL_eiztd4v2AndyibzKf3x-EEE2Ply7CQpSZYM/edit?gid=1224837914#gid=1224837914))
- Manually written tests proving non-equivalence: [`paper_results/non-equivalent mutations testCases/`](paper_results/non-equivalent%20mutations%20testCases/)
- Generated tests and execution logs: Under `paper_results/Experiment Results/.../artifacts/`

**Interpretation**:

- The validation tables show which mutants were killed by valid tests, invalid tests, or both. The 3.7% claim is derived from counting total number of mutants killed by invalid tests divided by total number of mutants for each configuration
- For non-equivalent mutants that Round 1 failed to kill with valid tests, we manually created tests to prove our claim of non-equivalence. Of the 15 such mutants, 5 were successfully killed by valid tests in Round 2, and the remaining 10 have manually written tests in the [`paper_results/non-equivalent mutations testCases/`](paper_results/non-equivalent%20mutations%20testCases/) directory

**Reproduction**:

- Stored classifications can be inspected directly
- Manual test validation cannot be automated (requires human judgment about behavioral validity)
- Evaluators can spot-check the test classifications by reading the generated tests or the mutation equivalence classifications by inspecting the corresponding mutated codes

---

## RQ5: How does the choice of mutation operators affect LLMutantKiller's ability to kill mutants?

### Table 6: Per-Mutator Valid-Kill Outcomes for Claude Sonnet 4.6

**Claim**: Mutation operator shows only a weak and statistically insignificant association with valid kill rates (Cramér's V = 0.134, p = 0.301 for Claude without tests). However, mutator type shows a statistically significant but still weak association with equivalence (Cramér's V = 0.267, p < 0.001). Table 6 presents per-mutator syntactic rules and statistics: total sampled, equivalent, non-equivalent, and valid-kill counts.

**Location**:

- Aggregated input data: [`paper_results/Evaluation/mutator_analysis_input.csv`](paper_results/Evaluation/mutator_analysis_input.csv) (also available in the Docker container at `analysis/mutator_analysis_input.csv`) — combines mutator types from mutation metadata ([`source-code/mutations/`](source-code/mutations/)), equivalence classifications ([`paper_results/Evaluation/mutationEquivalence.html`](paper_results/Evaluation/mutationEquivalence.html)), test validity labels ([`paper_results/Evaluation/Test Validation results/round1.html`](paper_results/Evaluation/Test%20Validation%20results/round1.html)), and kill outcomes from Round 1 ([`paper_results/Experiment Results/Round 1/`](paper_results/Experiment%20Results/Round%201/))
- Analysis script: [`paper_results/Evaluation/compute_mutator_association.py`](paper_results/Evaluation/compute_mutator_association.py) (also available in the Docker container at `analysis/compute_mutator_association.py`)
- Statistical results: [`paper_results/Evaluation/mutator_association_summary.txt`](paper_results/Evaluation/mutator_association_summary.txt)

**Interpretation**:

- The CSV contains one row per mutant/model/configuration from Round 1, with mutator type (from StrykerJS), equivalence classification, and valid-kill outcome
- The Python script tests whether mutator type is associated with valid kill rates and with equivalence using permutation tests, and quantifies association strength using Cramér's V
- **Cramér's V ranges**: < 0.10 = negligible, 0.10–0.30 = weak, 0.30–0.50 = moderate, > 0.50 = strong
- **p-value significance**: p < 0.05 indicates statistical significance
- Results: mutator vs. valid kill rates (V = 0.134, p = 0.301) is weak and insignificant; mutator vs. equivalence (V = 0.267, p < 0.001) is weak but significant
- Table 6 aggregates outcomes by mutator type for the default configuration

**Reproduction**:

- **Deterministically reproducible from Docker.** Inside the container, run:
  ```bash
  python3 analysis/compute_mutator_association.py \
    --input analysis/mutator_analysis_input.csv \
    --output analysis_outputs/mutator_association_results.csv \
    --summary analysis_outputs/mutator_association_summary.txt
  ```
  This computes the Cramér's V statistics and permutation test p-values from the input CSV. Expected runtime is approximately 1–5 minutes depending on host performance and emulation overhead. The generated summary is persisted to `docker_output/analysis_outputs/mutator_association_summary.txt` on the host and can be compared to the stored `paper_results/Evaluation/mutator_association_summary.txt` to verify identical results
- The CSV can be regenerated by combining the source data listed above
- Table 6 counts can be derived by aggregating the CSV
- For a live LLMutantKiller run: kill rates will differ due to nondeterminism, resulting in slightly different Cramér's V and p-values. However, the overall pattern (weak/insignificant association with kill success, weak but significant association with equivalence) should remain consistent

---

## RQ6: How does LLMutantKiller compare to TestPilot?

### Table 7: Mutants Killed by TestPilot

**Claim**: TestPilot kills substantially fewer mutants than LLMutantKiller. TestPilot kills 77 of the 915 mutants in Trial 1, while Claude (LLMutantKiller's default model) kills 811. The experiment was repeated for 5 independent trials to demonstrate consistency. Table 7 presents per-project results from Trial 1.

**Location**:

- TestPilot benchmark overview and structure: [`paper_results/testpilot_benchmark/README.md`](paper_results/testpilot_benchmark/README.md)
- TestPilot results (5 trials): [`paper_results/testpilot_benchmark/`](paper_results/testpilot_benchmark/) containing generated tests, execution logs, and per-trial kill counts
- Consolidated results across all 5 trials: [`paper_results/Evaluation/TestPilotResults5Runs.md`](paper_results/Evaluation/TestPilotResults5Runs.md)
- LLMutantKiller results for comparison: (same as Table 2) [`paper_results/Experiment Results/Round 1/anthropic_claude-sonnet-4.6/temp_0.5/withoutTests/2026-04-28_21-23/reports/summary.txt`](paper_results/Experiment%20Results/Round%201/anthropic_claude-sonnet-4.6/temp_0.5/withoutTests/2026-04-28_21-23/reports/summary.txt)

**Interpretation**:

- TestPilot results include generated test cases from the TestPilot unit test generation tool and execution logs showing outcomes on both original and mutated code
- The baseline comparison uses Trial 1, which killed 77 mutants. The experiment was repeated 5 times to verify consistency across independent runs
- For details on TestPilot's methodology and result structure, consult [`paper_results/testpilot_benchmark/README.md`](paper_results/testpilot_benchmark/README.md)

**Reproduction**:

- TestPilot baseline results are stored and can be inspected directly
- RQ6 is supported by stored evidence in this artifact; the TestPilot execution infrastructure is not bundled here
- We ran [TestPilot v2](https://github.com/neu-se/testpilot2.git) using its default configuration. The upstream tool is available from that repository for independent reruns
- TestPilot also relies on LLMs and exhibits nondeterminism; exact results cannot be reproduced, but outcomes should be similar as demonstrated by the consistency across 5 independent trials

---

## RQ7: What is the cost of running LLMutantKiller?

**Claim**: Cost varies by model and prompt configuration. Reported OpenRouter costs for Round 1 were: $253.14 (Claude without tests), $244.92 (Claude with tests), $25.72 (Devstral), and $10.17 (Llama). Token usage is also reported in Tables 2-5.

**Location**:

- Per-run token and time data: In `summary.csv`, `report.json`, and per-attempt CSVs under each stored run's `reports/` directory
- Per-mutant metadata: `meta_report.json` files under `artifacts/`
- Summary tables: Same as Tables 2-5 locations

**Interpretation**:

- Token fields: `tokensIn`, `tokensOut`, `uncachedTokensIn`, `cacheWriteTokens`, `cachedTokens`. Refer to [OpenRouter's documentation](https://openrouter.ai/docs/requests) for definitions of these token categories and their pricing policies. The final cost recorded can be computed by applying the per-token prices for each category to the corresponding token counts
- Cost was calculated from OpenRouter pricing at experiment time (prices may change)
- Time totals reflect wall-clock duration including API latency

**Reproduction**:

- Stored token/time data can be inspected and aggregated
- Live runs will produce different costs based on current OpenRouter pricing and different token counts due to nondeterminism
- Exact cost and token counts cannot be reproduced

---

## Reproducibility Summary

**What CAN be deterministically reproduced:**

- Template and mutation metadata inspection (Figures 2, 3, 4)
- Statistical association analysis (RQ5, Table 6) — run the Python script to recompute Cramér's V and permutation test results
- Stored result inspection and validation across all experiments
- Manual validation and equivalence classification auditing (classifications are stored with inter-rater reliability metrics)

**What CANNOT be exactly reproduced:**

- **LLM-generated tests and kill counts (Tables 2-5, 7; RQ1-RQ4, RQ6)**: Both LLMutantKiller and TestPilot use LLMs, which are nondeterministic. Live runs will produce different tests and different success counts. The artifact includes Round 1 and Round 2 results demonstrating the degree of variation across independent runs
- **Token usage and cost (RQ7)**: Depends on generated test length, current provider pricing, and prompt caching behavior
- **Manual classifications (RQ4)**: Human judgments about test validity and mutation equivalence cannot be automated. The artifact stores all classifications with inter-rater reliability metrics for auditing
- **TestPilot baseline (RQ6, Table 7)**: This artifact provides stored evidence rather than bundled TestPilot execution infrastructure. TestPilot v2 is available upstream and was run with its default configuration. TestPilot also exhibits LLM nondeterminism; the artifact includes 5 independent trials demonstrating consistency

**Relationship between stored results and live reproduction:**

The artifact provides complete stored results (Round 1 and Round 2 for all configurations) as the authoritative record for exact paper claims. Live reproduction demonstrates that LLMutantKiller remains functional and produces similar outcomes, but exact numbers will differ due to LLM nondeterminism. Evaluators can compare live results against the stored Round 1 and Round 2 data to verify that the tool produces consistent outcomes.
