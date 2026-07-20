// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cba673a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("should compute cosh correctly for real numbers", () => {
    const z = new Complex(0, 0);
    const result = z.cosh();
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
  });
});