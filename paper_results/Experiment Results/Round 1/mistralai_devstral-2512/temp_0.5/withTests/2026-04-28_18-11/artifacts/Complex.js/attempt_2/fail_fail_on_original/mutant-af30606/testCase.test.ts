// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-af30606/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute the hyperbolic secant for a complex number with non-zero real part", () => {
    const c = new Complex(1, 0.5);
    const result = c.sech();
    const expectedRe = 1 / Math.cosh(1) * Math.cos(0.5) / (Math.cos(1) + Math.cosh(1));
    const expectedIm = -Math.sinh(1) * Math.sin(0.5) / (Math.cos(1) + Math.cosh(1));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});