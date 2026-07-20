#!/usr/bin/env python3
"""Build mutator-level analysis data and compute Cramer's V associations.

The valid-kill association is computed over non-equivalent mutants only.
The equivalence association is computed once over the sampled mutants.
"""

from __future__ import annotations

import argparse
import csv
import json
import math
import random
from collections import Counter
from pathlib import Path


CONFIGURATIONS = [
    ("anthropic_claude-sonnet-4.6", "without"),
    ("anthropic_claude-sonnet-4.6", "with"),
    ("meta-llama_llama-3.3-70b-instruct", "without"),
    ("meta-llama_llama-3.3-70b-instruct", "with"),
    ("mistralai_devstral-2512", "without"),
    ("mistralai_devstral-2512", "with"),
]

DEFAULT_PERMUTATIONS = 100_000
DEFAULT_SEED = 42


def short_mutation_id(mutation_id: str) -> str:
    return "mutant-" + mutation_id.removeprefix("mutant-")[:7]


def load_equivalent_mutants(data_dir: Path) -> set[tuple[str, str]]:
    equivalent = set()
    with (data_dir / "mutationEquivalence.csv").open(newline="") as f:
        for row in csv.DictReader(f):
            if row["Final Verdict"] == "Equivalent":
                equivalent.add((row["Project"], short_mutation_id(row["MutationId"])))
    return equivalent


def load_valid_kills(data_dir: Path) -> set[tuple[str, str, str, str]]:
    valid_kills = set()
    with (data_dir / "round1.csv").open(newline="") as f:
        for row in csv.DictReader(f):
            if row["Final Verdict"] == "Valid":
                project, mutation_id = row["ProjectName___MutationId"].split("___")
                valid_kills.add(
                    (
                        project,
                        short_mutation_id(mutation_id),
                        row["Model"],
                        row["with/without test cases"],
                    )
                )
    return valid_kills


def build_input_csv(data_dir: Path, output_csv: Path) -> None:
    sample_path = data_dir / "mutations" / "requiredSample_list.json"
    with sample_path.open() as f:
        sampled_mutants = json.load(f)

    equivalent = load_equivalent_mutants(data_dir)
    valid_kills = load_valid_kills(data_dir)

    rows = []
    for project, mutation_ids in sampled_mutants.items():
        for full_mutation_id in mutation_ids:
            mutation_id = short_mutation_id(full_mutation_id)
            spec_path = data_dir / "mutations" / project / f"{full_mutation_id}.json"
            with spec_path.open() as f:
                mutator_name = json.load(f)["mutatorName"]

            is_equivalent = 1 if (project, mutation_id) in equivalent else 0
            for model, with_without in CONFIGURATIONS:
                rows.append(
                    {
                        "ProjectName": project,
                        "MutationId": mutation_id,
                        "mutatorName": mutator_name,
                        "Model": model,
                        "with/without test cases": with_without,
                        "Equivalence": is_equivalent,
                        "Valid Kill": 1
                        if (project, mutation_id, model, with_without) in valid_kills
                        else 0,
                    }
                )

    output_csv.parent.mkdir(parents=True, exist_ok=True)
    with output_csv.open("w", newline="") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=[
                "ProjectName",
                "MutationId",
                "mutatorName",
                "Model",
                "with/without test cases",
                "Equivalence",
                "Valid Kill",
            ],
        )
        writer.writeheader()
        writer.writerows(rows)


def cramers_v(categories: list[str], outcomes: list[int]) -> float:
    n = len(categories)
    row_counts = Counter(categories)
    col_counts = Counter(outcomes)
    cell_counts = Counter(zip(categories, outcomes))
    min_dimension = min(len(row_counts) - 1, len(col_counts) - 1)
    if n == 0 or min_dimension <= 0:
        return 0.0

    chi_square = 0.0
    for category in row_counts:
        for outcome in col_counts:
            expected = row_counts[category] * col_counts[outcome] / n
            if expected:
                observed = cell_counts[(category, outcome)]
                chi_square += (observed - expected) ** 2 / expected

    return math.sqrt(chi_square / (n * min_dimension))


def permutation_p_value(categories: list[str], outcomes: list[int], observed_v: float, permutations: int, seed: int) -> float:
    """Estimate a permutation p-value while preserving outcome counts."""
    n = len(categories)
    category_names = sorted(set(categories))
    category_indices = {category: index for index, category in enumerate(category_names)}
    groups = [category_indices[category] for category in categories]
    row_counts = [0] * len(category_names)
    for group in groups:
        row_counts[group] += 1

    total_success = sum(outcomes)
    total_failure = n - total_success
    minority_value = 1 if total_success <= total_failure else 0
    minority_count = total_success if minority_value == 1 else total_failure
    indices = list(range(n))

    def v_from_success_counts(success_counts: list[int]) -> float:
        chi_square = 0.0
        for index, row_count in enumerate(row_counts):
            failure_count = row_count - success_counts[index]
            for observed, column_count in (
                (success_counts[index], total_success),
                (failure_count, total_failure),
            ):
                expected = row_count * column_count / n
                if expected:
                    chi_square += (observed - expected) ** 2 / expected
        return math.sqrt(chi_square / n)

    rng = random.Random(seed)
    count = 0

    for _ in range(permutations):
        sampled_indices = rng.sample(indices, minority_count)
        minority_counts = [0] * len(category_names)
        for sampled_index in sampled_indices:
            minority_counts[groups[sampled_index]] += 1

        if minority_value == 1:
            success_counts = minority_counts
        else:
            success_counts = [
                row_count - minority_counts[index]
                for index, row_count in enumerate(row_counts)
            ]

        if v_from_success_counts(success_counts) >= observed_v - 1e-12:
            count += 1

    return (count + 1) / (permutations + 1)


def format_p_value(p_value: float) -> str:
    if p_value < 0.001:
        return "<0.001"
    return f"{p_value:.3f}"


def unique_mutants(rows: list[dict[str, str]]) -> list[dict[str, str]]:
    seen = set()
    unique_rows = []
    for row in rows:
        key = (row["ProjectName"], row["MutationId"])
        if key not in seen:
            seen.add(key)
            unique_rows.append(row)
    return unique_rows


def analyze(
    input_csv: Path,
    output_csv: Path,
    summary_txt: Path,
    permutations: int,
    seed: int,
) -> None:
    with input_csv.open(newline="") as f:
        rows = list(csv.DictReader(f))

    results = []
    summary_lines = [
        f"Permutation test settings: permutations={permutations}, seed={seed}",
        "",
        "Valid-kill outcome by mutator (non-equivalent mutants only):",
    ]

    for model, with_without in CONFIGURATIONS:
        config_rows = [
            row
            for row in rows
            if row["Model"] == model
            and row["with/without test cases"] == with_without
            and row["Equivalence"] == "0"
        ]
        categories = [row["mutatorName"] for row in config_rows]
        outcomes = [int(row["Valid Kill"]) for row in config_rows]
        v_value = cramers_v(categories, outcomes)
        p_value = permutation_p_value(categories, outcomes, v_value, permutations, seed)
        results.append(
            {
                "Model": model,
                "with/without test cases": with_without,
                "Cramer's V": f"{v_value:.3f}",
                "p": f"{p_value:.6f}",
            }
        )
        summary_lines.append(
            f"- {model}___{with_without}: Cramer's V={v_value:.3f}, p={format_p_value(p_value)}"
        )

    mutant_rows = unique_mutants(rows)
    categories = [row["mutatorName"] for row in mutant_rows]
    outcomes = [int(row["Equivalence"]) for row in mutant_rows]
    eq_v = cramers_v(categories, outcomes)
    eq_p = permutation_p_value(categories, outcomes, eq_v, permutations, seed)
    summary_lines.extend(
        [
            "",
            "Mutation equivalence by mutator:",
            f"- Equivalence: Cramer's V={eq_v:.3f}, p={format_p_value(eq_p)}",
        ]
    )

    output_csv.parent.mkdir(parents=True, exist_ok=True)
    with output_csv.open("w", newline="") as f:
        writer = csv.DictWriter(
            f,
            fieldnames=["Model", "with/without test cases", "Cramer's V", "p"],
        )
        writer.writeheader()
        writer.writerows(results)

    summary_txt.write_text("\n".join(summary_lines) + "\n")


def main() -> None:
    script_dir = Path(__file__).resolve().parent
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "--input",
        type=Path,
        default=script_dir / "mutator_analysis_input.csv",
        help="Input CSV with per-mutant/per-configuration outcomes.",
    )
    parser.add_argument(
        "--output",
        type=Path,
        default=script_dir / "mutator_association_results.csv",
        help="Output CSV with per-configuration Cramer's V and p-values.",
    )
    parser.add_argument(
        "--summary",
        type=Path,
        default=script_dir / "mutator_association_summary.txt",
        help="Output text summary.",
    )
    parser.add_argument(
        "--build-input",
        action="store_true",
        help="Build the input CSV from raw data before computing associations.",
    )
    parser.add_argument("--permutations", type=int, default=DEFAULT_PERMUTATIONS)
    parser.add_argument("--seed", type=int, default=DEFAULT_SEED)
    args = parser.parse_args()

    if args.build_input:
        build_input_csv(script_dir, args.input)

    analyze(args.input, args.output, args.summary, args.permutations, args.seed)


if __name__ == "__main__":
    main()
