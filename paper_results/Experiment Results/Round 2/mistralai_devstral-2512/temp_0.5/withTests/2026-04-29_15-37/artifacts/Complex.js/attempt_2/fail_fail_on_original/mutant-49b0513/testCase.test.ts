// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-49b0513/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly handle the atanh of a complex number with real part greater than 1", () => {
    const c = new Complex(2, 1);
    const result = c.atanh();
    // The mutation changes x['re'] to x[""] which will cause incorrect calculation
    // This test verifies the correct behavior by checking the result is not NaN
    expect(result.re).toBeFinite();
    expect(result.im).toBeFinite();
    // Additional check to ensure the result is not completely wrong
    expect(Math.abs(result.re)).toBeGreaterThan(0);
  });
});