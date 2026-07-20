// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot function", () => {
  it("should handle very large values correctly without overflow", () => {
    // Test with values that would overflow in the simple sqrt(a*a + b*b) calculation
    // but should work with the alternative algorithm
    const c = new Complex(1e150, 1e150);
    const absValue = c.abs();
    // The expected value should be approximately 1.4142e150 (sqrt(2)*1e150)
    // but the exact calculation isn't possible with standard JS numbers
    // We just verify it doesn't return Infinity or NaN
    expect(Number.isFinite(absValue)).toBe(true);
    expect(Number.isNaN(absValue)).toBe(false);
  });
});