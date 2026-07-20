// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9c79a13/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.sech() method', () => {
  it('should correctly compute the hyperbolic secant for a complex number with non-zero real and imaginary parts', () => {
    const z = new Complex(1, 1);
    const result = z.sech();
    const expectedRe = 2 * Math.cosh(1) * Math.cos(1) / (Math.cos(2) - Math.cosh(2));
    const expectedIm = -2 * Math.sinh(1) * Math.sin(1) / (Math.cos(2) - Math.cosh(2));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});