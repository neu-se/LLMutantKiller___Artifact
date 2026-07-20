// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_7/pending_category/mutant-364057b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should handle complex number with zero real part and non-zero imaginary part when magnitude is zero", () => {
    const c = new Complex(0, 1);
    // Force magnitude to be zero by setting both components to zero
    c.re = 0;
    c.im = 0;
    const result = c.asech();
    expect(result.isInfinite()).toBe(true);
  });
});