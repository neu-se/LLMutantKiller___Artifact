// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-ed9c36b/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sec()", () => {
  it("should correctly compute secant for complex numbers with non-zero imaginary part", () => {
    const c = new Complex(0, 2);
    const result = c.sec();
    const expectedRe = 1 / Math.cosh(2);
    const expectedIm = 0;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});