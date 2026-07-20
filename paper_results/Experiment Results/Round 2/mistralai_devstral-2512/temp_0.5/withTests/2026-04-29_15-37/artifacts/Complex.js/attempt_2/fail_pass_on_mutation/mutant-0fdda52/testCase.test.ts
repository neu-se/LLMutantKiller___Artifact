// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0fdda52/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function behavior with large values", () => {
  it("should correctly compute hypot when a < b for large values", () => {
    // This test targets the mutation in the hypot function where the condition was changed from a < b to a >= b
    // We use large values where a < b to trigger the specific branch that was mutated
    const a = 3000;
    const b = 4000;
    const c = new Complex(a, b);
    const expectedAbs = Math.sqrt(a * a + b * b);
    expect(c.abs()).toBeCloseTo(expectedAbs);
  });
});