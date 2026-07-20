// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c669b15/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division boundary condition", () => {
  it("should produce different results when |c| exactly equals |d|", () => {
    // This test specifically targets the boundary where |c| == |d|
    // The mutation changes < to <= which affects which branch is taken
    // We need a case where the two branches produce different results

    // Using (1+1i) / (1+1i) - this should be (1+0i)
    // But let's use a case where the branches would produce different results
    // The key is to find inputs where the two calculation methods give different results

    // After analyzing the code, when |c| == |d|, the original uses the second branch
    // while the mutated version would use the first branch
    // Let's use (1+1i) / (1+1i) which should be exactly 1+0i
    const numerator = new Complex(1, 1);
    const denominator = new Complex(1, 1);
    const result = numerator.div(denominator);

    // The correct result should be exactly 1+0i
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);

    // Now test a case where the two branches would produce different floating point results
    // Using (3+3i) / (1+1i) - this should be (3+0i)
    const numerator2 = new Complex(3, 3);
    const denominator2 = new Complex(1, 1);
    const result2 = numerator2.div(denominator2);

    // The correct result should be exactly 3+0i
    expect(result2.re).toBe(3);
    expect(result2.im).toBe(0);

    // Test with negative values where |c| == |d|
    const numerator3 = new Complex(-1, -1);
    const denominator3 = new Complex(1, 1);
    const result3 = numerator3.div(denominator3);

    // The correct result should be (-1+0i)
    expect(result3.re).toBe(-1);
    expect(result3.im).toBe(0);
  });
});