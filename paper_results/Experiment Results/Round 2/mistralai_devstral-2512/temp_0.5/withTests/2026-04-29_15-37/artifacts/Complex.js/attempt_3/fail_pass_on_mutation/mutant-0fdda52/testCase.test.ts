// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0fdda52/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function behavior with large values", () => {
  it("should correctly compute hypot for large values where a < b", () => {
    // This test specifically targets the mutation where the condition was changed from a < b to a >= b
    // Using values that will trigger the mutated branch differently than the original
    const a = 2500;
    const b = 3500;
    const c = new Complex(a, b);
    const expectedAbs = Math.sqrt(a * a + b * b);
    expect(c.abs()).toBeCloseTo(expectedAbs, 10);
  });
});