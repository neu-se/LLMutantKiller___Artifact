// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-0fdda52/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot function mutation test", () => {
  it("should correctly compute hypot for values where a is slightly larger than b", () => {
    // This test targets the mutation in the hypot function where the condition was changed from a < b to a >= b
    // We test with values where a is just slightly larger than b to trigger the mutated branch
    const c = new Complex(3001, 3000);
    const absValue = c.abs();
    // The correct hypot calculation for (3001, 3000) should be sqrt(3001² + 3000²) ≈ 4242.640687119285
    expect(absValue).toBeCloseTo(4242.640687119285);
  });
});