// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-53e9f2e/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh", () => {
  it("should correctly compute atanh for a specific complex number", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    // The mutation changes division to multiplication in the atanh calculation
    // This test verifies the correct behavior by checking the result against known values
    expect(result.re).toBeCloseTo(0.40235947810852507, 10);
    expect(result.im).toBeCloseTo(0.5535743588970452, 10);
  });
});