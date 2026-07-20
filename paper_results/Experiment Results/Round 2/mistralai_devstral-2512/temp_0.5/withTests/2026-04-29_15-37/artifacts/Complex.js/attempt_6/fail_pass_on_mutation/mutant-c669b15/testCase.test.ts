// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c669b15/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division boundary condition", () => {
  it("should handle division when |c| exactly equals |d| with specific floating point precision", () => {
    // This test targets the exact boundary where |c| == |d|
    // The mutation changes the condition from < to <= which affects branch selection
    // We need to find a case where the two calculation methods produce different results

    // Using values where |c| == |d| but the two calculation branches would produce
    // slightly different floating point results due to different arithmetic paths
    const numerator = new Complex(1.23456789, 9.87654321);
    const denominator = new Complex(5.55555555, 5.55555555);
    const result = numerator.div(denominator);

    // Calculate expected result using the original branch (second branch)
    // (a + b*x)/t where x = d/c and t = d*x + c
    const a = 1.23456789;
    const b = 9.87654321;
    const c = 5.55555555;
    const d = 5.55555555;
    const x = d / c;
    const t = d * x + c;
    const expectedRe = (a + b * x) / t;
    const expectedIm = (b - a * x) / t;

    // The test should pass on original code (using second branch)
    // but fail on mutated code (using first branch)
    expect(result.re).toBeCloseTo(expectedRe, 12);
    expect(result.im).toBeCloseTo(expectedIm, 12);
  });
});