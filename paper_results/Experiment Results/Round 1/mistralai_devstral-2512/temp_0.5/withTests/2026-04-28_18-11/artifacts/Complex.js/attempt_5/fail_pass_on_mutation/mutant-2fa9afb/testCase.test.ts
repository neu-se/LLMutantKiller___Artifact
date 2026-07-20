// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2fa9afb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should not return NaN for valid non-zero inputs", () => {
    const c = new Complex(1, 1);
    const result = c.sinh();
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});