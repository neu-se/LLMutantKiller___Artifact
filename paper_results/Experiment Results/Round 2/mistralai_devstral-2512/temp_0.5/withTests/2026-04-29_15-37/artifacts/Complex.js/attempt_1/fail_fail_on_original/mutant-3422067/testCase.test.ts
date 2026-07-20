// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-3422067/testCase.test.ts
import { Complex } from "./complex.js";

describe("hypot function edge case", () => {
  it("should correctly compute hypot when a equals b", () => {
    // This test targets the mutation in the hypot function where the condition
    // was changed from `if (a < b)` to `if (a <= b)`. We test the case where a == b
    // to expose the behavioral difference.
    const c = new Complex(3000, 3000);
    const absValue = c.abs();
    // The correct behavior should handle a == b without triggering the else branch
    // The mutated version will incorrectly take the else branch when a == b
    expect(absValue).toBeCloseTo(Math.sqrt(3000 * 3000 + 3000 * 3000));
  });
});