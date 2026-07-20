// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0fdda52/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot function mutation test", () => {
  it("should correctly compute hypot for values where a is much larger than b", () => {
    // This test targets the mutation in the hypot function where the condition was changed from a < b to a >= b
    // We test with values where a is significantly larger than b to trigger the mutated branch
    const c = new Complex(4000, 1000);
    const absValue = c.abs();
    // The correct hypot calculation for (4000, 1000) should be sqrt(4000² + 1000²) ≈ 4123.105625617661
    expect(absValue).toBeCloseTo(4123.105625617661);
  });
});