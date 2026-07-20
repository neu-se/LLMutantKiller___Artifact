// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3422067/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function edge case", () => {
  it("should correctly compute hypot when a equals b and values are exactly at threshold", () => {
    // Test with values exactly at the threshold where the mutation would change behavior
    const c = new Complex(3000, 3000);
    const absValue = c.abs();
    // The original code uses Math.sqrt(a*a + b*b) when a >= b
    // The mutated code will incorrectly use the else branch when a == b
    // This should produce different results due to floating point precision
    const expected = Math.sqrt(3000 * 3000 + 3000 * 3000);
    // Using exact equality check to catch the difference
    expect(absValue).toBe(expected);
  });
});