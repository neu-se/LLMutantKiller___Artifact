// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2fa9afb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should correctly handle non-zero inputs and return expected values", () => {
    const c = new Complex(1, 0);
    const result = c.sinh();
    const expectedRe = Math.sinh(1);
    const expectedIm = 0;
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBe(expectedIm);
  });
});