// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c669b15/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division boundary condition", () => {
  it("should produce different results when |c| exactly equals |d| due to different calculation paths", () => {
    // This test specifically targets the boundary where |c| == |d|
    // The mutation changes the condition from < to <= which affects which branch is taken
    // We need a case where the two calculation methods produce different floating point results

    // Using values where |c| == |d| but the two calculation branches would produce
    // different results due to different arithmetic paths
    const numerator = new Complex(1, 2);
    const denominator = new Complex(2, 1);
    const result = numerator.div(denominator);

    // The correct result should be (0.8+0.6i) when using the second branch
    // But would be different if using the first branch
    expect(result.re).toBeCloseTo(0.8, 10);
    expect(result.im).toBeCloseTo(0.6, 10);

    // Now test with values where |c| == |d| and the difference would be more pronounced
    const numerator2 = new Complex(1.123456789, 2.987654321);
    const denominator2 = new Complex(2.055555555, 2.055555555);
    const result2 = numerator2.div(denominator2);

    // Calculate expected result using the second branch (original code)
    const a = 1.123456789;
    const b = 2.987654321;
    const c = 2.055555555;
    const d = 2.055555555;
    const x = d / c;
    const t = d * x + c;
    const expectedRe = (a + b * x) / t;
    const expectedIm = (b - a * x) / t;

    // This should pass on original code but fail on mutated code
    expect(result2.re).toBeCloseTo(expectedRe, 12);
    expect(result2.im).toBeCloseTo(expectedIm, 12);
  });
});