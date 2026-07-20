// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-4d22438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function mutation test", () => {
  it("should correctly compute hypot for large values where a < b", () => {
    // Test with specific values that will expose the mutation in the hypot function
    // The mutation changes b = y / x to b = y * x in the a < b branch
    // Using values where the difference between correct and mutated calculation is significant
    const c = new Complex(1000, 3000);
    const expectedAbs = Math.sqrt(1000 * 1000 + 3000 * 3000);
    const actualAbs = c.abs();
    expect(actualAbs).toBeCloseTo(expectedAbs, 10);
  });
});