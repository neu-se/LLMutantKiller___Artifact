// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5e342d9/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot function mutation test", () => {
  it("should correctly compute hypot for large values where a >= b", () => {
    // This test targets the mutation in the hypot function where b = x / y was changed to b = x * y
    // We use specific large values that will produce different results with the mutation
    const a = 3000;
    const b = 2000;
    const c = new Complex(a, b);
    // Calculate expected result using the correct formula
    const expectedAbs = Math.sqrt(a * a + b * b);
    // The mutated version would calculate b = x * y instead of b = x / y
    // This would produce a different result that we can detect
    expect(c.abs()).toBeCloseTo(expectedAbs, 10);
  });
});