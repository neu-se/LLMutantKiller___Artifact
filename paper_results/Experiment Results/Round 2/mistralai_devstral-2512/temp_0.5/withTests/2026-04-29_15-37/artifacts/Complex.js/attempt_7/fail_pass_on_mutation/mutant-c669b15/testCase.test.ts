// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c669b15/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division boundary condition", () => {
  it("should produce different results when |c| exactly equals |d|", () => {
    // This test specifically targets the boundary where |c| == |d|
    // The mutation changes the condition from < to <= which affects branch selection
    // We need a case where the two calculation methods produce different floating point results

    // Using values where |c| == |d| and the two calculation branches would produce
    // different results due to different arithmetic paths
    const numerator = new Complex(1, 1);
    const denominator = new Complex(1, 1);
    const result = numerator.div(denominator);

    // The correct result should be exactly 1+0i when using the second branch
    // But would be different if using the first branch
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);

    // Now test with values where |c| == |d| and the difference would be more pronounced
    const numerator2 = new Complex(2, 2);
    const denominator2 = new Complex(1, 1);
    const result2 = numerator2.div(denominator2);

    // The correct result should be exactly 2+0i when using the second branch
    // But would be different if using the first branch
    expect(result2.re).toBe(2);
    expect(result2.im).toBe(0);

    // Test with negative values where |c| == |d|
    const numerator3 = new Complex(-1, -1);
    const denominator3 = new Complex(1, 1);
    const result3 = numerator3.div(denominator3);

    // The correct result should be exactly -1+0i when using the second branch
    // But would be different if using the first branch
    expect(result3.re).toBe(-1);
    expect(result3.im).toBe(0);
  });
});