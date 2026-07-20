// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ee0d53a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot function", () => {
  it("should correctly handle edge case where a >= 3000 and b >= 3000", () => {
    // This test targets the specific mutation by using values where both a and b are >= 3000
    // The mutation changes the condition from (a < 3000 && b < 3000) to (true && b < 3000)
    // This means when b >= 3000, the function will skip both paths and return undefined
    const c = new Complex(3500, 3500);
    const absValue = c.abs();
    // With the mutation, this would return undefined (no return value)
    // With the correct code, it should return a finite number
    expect(absValue).toBeDefined();
    expect(Number.isFinite(absValue)).toBe(true);
    expect(absValue).toBeCloseTo(Math.sqrt(3500*3500 + 3500*3500));
  });
});