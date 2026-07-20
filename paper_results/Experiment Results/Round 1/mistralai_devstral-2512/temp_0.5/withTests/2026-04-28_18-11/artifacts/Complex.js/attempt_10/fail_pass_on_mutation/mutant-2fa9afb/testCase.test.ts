// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2fa9afb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh", () => {
  it("should return correct result for sinh(1 + 1i)", () => {
    const c = new Complex(1, 1);
    const result = c.sinh();
    const expectedRe = Math.sinh(1) * Math.cos(1);
    const expectedIm = Math.cosh(1) * Math.sin(1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});