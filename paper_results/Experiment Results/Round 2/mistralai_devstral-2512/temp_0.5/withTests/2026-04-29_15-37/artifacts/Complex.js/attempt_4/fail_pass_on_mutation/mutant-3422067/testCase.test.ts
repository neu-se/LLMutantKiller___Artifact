// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3422067/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function edge case", () => {
  it("should correctly compute hypot when a equals b and values are large", () => {
    // Test case where a == b and values are large enough to trigger the else branch
    const c = new Complex(4000, 4000);
    const absValue = c.abs();
    // The original code should use the first branch (a < b is false when a == b)
    // The mutated code will incorrectly use the else branch when a == b
    // This will produce different results due to different calculation paths
    const expected = Math.sqrt(4000 * 4000 + 4000 * 4000);
    expect(absValue).toBeCloseTo(expected, 10);
  });
});