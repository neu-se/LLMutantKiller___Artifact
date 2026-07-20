// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/Complex.js/attempt_1/pending_category/mutant-9c79a13/testCase.test.ts
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.sech() method', () => {
  it('should correctly compute the hyperbolic secant for a complex number with real part 0.5 and imaginary part 0.5', () => {
    const z = new Complex(0.5, 0.5);
    const result = z.sech();
    // Calculate expected values manually using the correct formula
    const a = 0.5, b = 0.5;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);
    const expectedRe = 2 * Math.cosh(a) * Math.cos(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});