// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-cba673a/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosh function", () => {
  it("should correctly compute cosh for non-zero values", () => {
    const c = new Complex(1, 0);
    const result = c.cosh();
    expect(result.re).toBeCloseTo(1.5430806348152437);
    expect(result.im).toBeCloseTo(0);
  });
});