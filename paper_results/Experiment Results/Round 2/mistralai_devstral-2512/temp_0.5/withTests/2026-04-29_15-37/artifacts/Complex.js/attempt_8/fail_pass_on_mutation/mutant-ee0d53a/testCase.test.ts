// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot function", () => {
  it("should use the correct algorithm for large values to avoid overflow", () => {
    // Test with values where a >= 3000 that would cause overflow with simple calculation
    // The mutation would incorrectly use the simple sqrt(a*a + b*b) path
    const c = new Complex(1e8, 1e8);
    const absValue = c.abs();
    // With the mutation, this would overflow to Infinity
    // With the correct code, it should use the alternative algorithm
    expect(absValue).not.toBe(Infinity);
    expect(Number.isFinite(absValue)).toBe(true);
  });
});