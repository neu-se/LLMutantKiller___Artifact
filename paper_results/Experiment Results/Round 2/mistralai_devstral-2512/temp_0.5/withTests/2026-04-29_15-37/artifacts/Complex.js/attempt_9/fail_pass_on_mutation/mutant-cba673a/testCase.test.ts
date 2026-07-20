// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cba673a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosh function", () => {
  it("should return a valid complex number when cosh is called", () => {
    const z = new Complex(1, 0);
    const result = z.cosh();
    expect(result.isNaN()).toBe(false);
    expect(result.isFinite()).toBe(true);
  });
});