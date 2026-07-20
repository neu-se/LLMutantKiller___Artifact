// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c669b15/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division boundary condition", () => {
  it("should handle division when |c| exactly equals |d| with specific values that expose different calculation paths", () => {
    // This test targets the exact boundary where |c| == |d|
    // The mutation changes the condition from < to <= which affects branch selection
    // We need values where the two calculation methods produce different results

    // Using specific values where |c| == |d| and the two calculation branches
    // would produce different floating point results
    const numerator = new Complex(1, 3);
    const denominator = new Complex(2, 2); // |2| == |2|
    const result = numerator.div(denominator);

    // Calculate expected result using both branches to verify difference
    // First branch (mutated version would use this):
    const a = 1, b = 3, c = 2, d = 2;
    const x1 = c / d;
    const t1 = c * x1 + d;
    const firstBranchRe = (a * x1 + b) / t1;
    const firstBranchIm = (b * x1 - a) / t1;

    // Second branch (original version uses this):
    const x2 = d / c;
    const t2 = d * x2 + c;
    const secondBranchRe = (a + b * x2) / t2;
    const secondBranchIm = (b - a * x2) / t2;

    // The original code should use second branch, mutated code would use first branch
    // These should be different values
    expect(result.re).toBeCloseTo(secondBranchRe, 10);
    expect(result.im).toBeCloseTo(secondBranchIm, 10);
    expect(result.re).not.toBeCloseTo(firstBranchRe, 10);
    expect(result.im).not.toBeCloseTo(firstBranchIm, 10);
  });
});