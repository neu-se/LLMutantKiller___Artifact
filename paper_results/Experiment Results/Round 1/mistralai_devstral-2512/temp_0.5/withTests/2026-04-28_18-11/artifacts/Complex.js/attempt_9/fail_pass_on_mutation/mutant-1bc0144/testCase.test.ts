// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-1bc0144/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should use the real part of the complex number in calculation", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    // The mutation changes 'this['re']' to 'this[""]' which would be undefined
    // This should cause the calculation to fail or produce NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});