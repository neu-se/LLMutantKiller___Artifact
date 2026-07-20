// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-2fa9afb/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sinh()", () => {
  it("should return correct values for non-zero inputs and not be affected by the (a === 0 && b === 0) condition", () => {
    const testCases = [
      { re: 1, im: 0 },
      { re: 0, im: 1 },
      { re: 2, im: 2 },
      { re: -1, im: -1 }
    ];

    testCases.forEach(({ re, im }) => {
      const result = new Complex(re, im).sinh();
      const expectedRe = Math.sinh(re) * Math.cos(im);
      const expectedIm = Math.cosh(re) * Math.sin(im);
      expect(result.re).toBeCloseTo(expectedRe, 10);
      expect(result.im).toBeCloseTo(expectedIm, 10);
    });
  });
});