// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-5e342d9/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js hypot function mutation test", () => {
  it("should correctly compute hypot for large values where a >= b", () => {
    // This test targets the mutation in the hypot function where b = x / y was changed to b = x * y
    // We use large values to trigger the branch where a >= b in the hypot function
    const a = 4000;
    const b = 3000;
    const c = new Complex(a, b);
    const expectedAbs = Math.sqrt(a * a + b * b);
    const actualAbs = c.abs();
    // The mutation would cause incorrect calculation when a >= b
    // Using a specific value check that would fail with the mutation
    expect(actualAbs).toBeCloseTo(5000, 10);
  });
});