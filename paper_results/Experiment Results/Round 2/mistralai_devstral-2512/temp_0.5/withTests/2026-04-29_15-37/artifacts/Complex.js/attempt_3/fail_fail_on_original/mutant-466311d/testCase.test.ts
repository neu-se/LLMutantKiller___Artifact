// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-466311d/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.logHypot", () => {
  it("should correctly handle large values in log computation", () => {
    // Test case that will fail on the mutated version where the condition `_a < 3000` is always true
    // The mutation causes large values to incorrectly use the non-overflow path
    const largeValue = 5000;
    const c = new Complex(largeValue, largeValue);
    const result = c.log();

    // For large values, the original code uses the overflow protection path
    // which computes: 0.5 * Math.log(a*a + b*b) + Math.LN2
    const expectedRe = 0.5 * Math.log(largeValue * largeValue + largeValue * largeValue) + Math.LN2;
    const expectedIm = Math.atan2(largeValue, largeValue);

    // The mutated code will incorrectly use the non-overflow path
    // which computes: Math.log(a*a + b*b) * 0.5
    // This will give a different result for large values
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});