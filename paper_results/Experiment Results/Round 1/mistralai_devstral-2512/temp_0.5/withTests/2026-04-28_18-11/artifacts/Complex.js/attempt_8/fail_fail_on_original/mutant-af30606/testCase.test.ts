// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-af30606/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute the hyperbolic secant for a complex number with non-zero real part", () => {
    const c = new Complex(1, 0.5);
    const result = c.sech();

    // The original implementation should return:
    // re = 2 * Math.cos(b) / Math.cosh(a) / d
    // im = -2 * Math.sinh(a) * Math.sin(b) / d
    // where d = Math.cos(2*b) + Math.cosh(2*a)
    const a = 1;
    const b = 0.5;
    const d = Math.cos(2*b) + Math.cosh(2*a);
    const expectedRe = 2 * Math.cos(b) / Math.cosh(a) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});