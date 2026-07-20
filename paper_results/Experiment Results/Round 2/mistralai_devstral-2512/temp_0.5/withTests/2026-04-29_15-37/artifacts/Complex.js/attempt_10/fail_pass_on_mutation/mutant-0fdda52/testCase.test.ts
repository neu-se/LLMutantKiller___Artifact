// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0fdda52/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function behavior with large values", () => {
  it("should correctly compute hypot when a < b for large values", () => {
    // This test targets the specific mutation where the condition was changed from a < b to a >= b
    // Using values that will trigger different calculation paths in original vs mutated code
    const a = 2500;
    const b = 3500;
    const c = new Complex(a, b);
    const expectedAbs = Math.sqrt(a * a + b * b);
    // The mutation will cause the wrong branch to be taken, producing incorrect results
    // Using a very tight tolerance to catch the difference
    expect(c.abs()).toBeCloseTo(expectedAbs, 2);
  });
});