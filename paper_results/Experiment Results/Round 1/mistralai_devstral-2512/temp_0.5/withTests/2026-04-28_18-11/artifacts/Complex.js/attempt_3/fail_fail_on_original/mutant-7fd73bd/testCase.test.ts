// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-7fd73bd/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should return NaN for zero with positive real part in log", () => {
    const c = new Complex(0, 0);
    const result = c.log();
    expect(result.isNaN()).toBe(true);
  });
});