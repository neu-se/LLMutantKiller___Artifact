// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3422067/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function edge case", () => {
  it("should correctly handle the case where a equals b in hypot calculation", () => {
    // Create a complex number where both real and imaginary parts are equal and large
    const c = new Complex(3001, 3001);
    const absValue = c.abs();
    // The original code should use the first branch (a < b is false when a == b)
    // The mutated code will incorrectly use the else branch when a == b
    const expected = Math.sqrt(3001 * 3001 + 3001 * 3001);
    expect(absValue).toBeCloseTo(expected);
  });
});