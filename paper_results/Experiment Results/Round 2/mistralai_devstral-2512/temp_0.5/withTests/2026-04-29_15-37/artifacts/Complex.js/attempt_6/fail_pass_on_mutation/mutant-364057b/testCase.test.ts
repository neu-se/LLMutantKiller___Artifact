// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_6/pending_category/mutant-364057b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should handle complex number with non-zero real and zero imaginary parts when magnitude is zero", () => {
    const c = new Complex(1, 0);
    c.re = 0;
    c.im = 0;
    const result = c.asech();
    expect(result.isInfinite()).toBe(true);
  });
});