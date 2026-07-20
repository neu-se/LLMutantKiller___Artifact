// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot function", () => {
  it("should handle values where a >= 3000 and b < 3000 without overflow", () => {
    // This test specifically targets the mutation by using a value where:
    // - a >= 3000 (would trigger the mutation's incorrect path)
    // - b < 3000 (so the mutation would use the simple sqrt path)
    // The simple sqrt(a*a + b*b) would overflow for large a values
    const c = new Complex(1e100, 1000);
    const absValue = c.abs();
    // With the mutation, this would overflow to Infinity
    // With the correct code, it should use the alternative algorithm
    expect(absValue).not.toBe(Infinity);
    expect(Number.isFinite(absValue)).toBe(true);
  });
});