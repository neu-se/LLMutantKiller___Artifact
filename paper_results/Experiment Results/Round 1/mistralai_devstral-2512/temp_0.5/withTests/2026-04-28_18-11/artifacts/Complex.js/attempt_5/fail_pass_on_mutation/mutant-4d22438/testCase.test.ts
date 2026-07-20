// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-4d22438/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("hypot function mutation test", () => {
  it("should correctly compute hypot for large values where a < b", () => {
    // Test with values that will trigger the a < b branch and expose the mutation
    // The mutation changes b = y / x to b = y * x
    const c = new Complex(1500, 4000);
    const expectedAbs = Math.sqrt(1500 * 1500 + 4000 * 4000);
    expect(c.abs()).toBeCloseTo(expectedAbs, 10);
  });
});