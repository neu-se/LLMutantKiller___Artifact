import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asech()', () => {
  it('should correctly compute the inverse hyperbolic secant for a specific complex number', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The expected result is computed based on the original implementation
    // For c = 0.5 + 0.5i, the correct asech should be approximately:
    const expectedRe = 1.0612750619050357;
    const expectedIm = -0.9045568943023813;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});