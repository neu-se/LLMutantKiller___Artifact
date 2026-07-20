// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0fdda52/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot function mutation test", () => {
  it("should correctly compute hypot for large values where a < b", () => {
    // This test targets the mutation in the hypot function where the condition was changed from a < b to a >= b
    // We test with values where a < b to trigger the mutated branch
    const c = new Complex(3000, 4000);
    const absValue = c.abs();
    // The correct hypot calculation for (3000, 4000) should be 5000
    expect(absValue).toBe(5000);
  });
});