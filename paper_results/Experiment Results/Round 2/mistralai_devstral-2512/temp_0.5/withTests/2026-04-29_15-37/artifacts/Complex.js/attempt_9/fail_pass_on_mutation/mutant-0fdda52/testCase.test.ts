// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0fdda52/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function behavior with large values", () => {
  it("should correctly compute hypot when a < b for very large values", () => {
    // This test specifically targets the mutation where the condition was changed from a < b to a >= b
    // Using values that will trigger different calculation paths in original vs mutated code
    const a = 1000;
    const b = 5000;
    const c = new Complex(a, b);
    const expectedAbs = Math.sqrt(a * a + b * b);
    // The mutation will cause the wrong branch to be taken, producing incorrect results
    // Using a tight tolerance to catch the difference
    expect(c.abs()).toBeCloseTo(expectedAbs, 4);
  });
});