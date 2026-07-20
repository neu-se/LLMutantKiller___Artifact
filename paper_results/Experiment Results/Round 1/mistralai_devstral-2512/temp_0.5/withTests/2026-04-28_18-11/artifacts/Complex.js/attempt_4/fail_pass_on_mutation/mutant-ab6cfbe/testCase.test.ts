// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ab6cfbe/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should return correct log for positive real numbers", () => {
    const positiveReal = new Complex(1, 0);
    const result = positiveReal.log();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBe(0);
  });
});