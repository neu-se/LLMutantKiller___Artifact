// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-c669b15/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division edge case", () => {
  it("should correctly handle division when |c| == |d|", () => {
    // Create a case where |c| == |d| to target the mutation
    // Using (1+1i) / (1+1i) - should give (1+0i)
    const numerator = new Complex(1, 1);
    const denominator = new Complex(1, 1);
    const result = numerator.div(denominator);

    // The correct result should be (1+0i)
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);

    // Test another edge case where |c| == |d| but with different values
    // Using (2+2i) / (2+2i) - should also give (1+0i)
    const numerator2 = new Complex(2, 2);
    const denominator2 = new Complex(2, 2);
    const result2 = numerator2.div(denominator2);

    expect(result2.re).toBeCloseTo(1, 10);
    expect(result2.im).toBeCloseTo(0, 10);

    // Test a case where the two branches would produce different results
    // Using (1+2i) / (2+1i) - this should be (0.8+0.6i)
    const numerator3 = new Complex(1, 2);
    const denominator3 = new Complex(2, 1);
    const result3 = numerator3.div(denominator3);

    expect(result3.re).toBeCloseTo(0.8, 10);
    expect(result3.im).toBeCloseTo(0.6, 10);
  });
});