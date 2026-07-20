// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3422067/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function edge case", () => {
  it("should correctly handle the boundary case where a equals b in hypot calculation", () => {
    // Create a complex number where both parts are equal and just above the threshold
    const c = new Complex(3001, 3001);
    const absValue = c.abs();
    // The original code should use the first branch (a < b is false when a == b)
    // The mutated code will incorrectly use the else branch when a == b
    // This will produce different results due to different calculation paths
    const expected = Math.sqrt(3001 * 3001 + 3001 * 3001);
    // Using a tight tolerance to catch the difference in calculation methods
    expect(absValue).toBeCloseTo(expected, 8);
  });
});