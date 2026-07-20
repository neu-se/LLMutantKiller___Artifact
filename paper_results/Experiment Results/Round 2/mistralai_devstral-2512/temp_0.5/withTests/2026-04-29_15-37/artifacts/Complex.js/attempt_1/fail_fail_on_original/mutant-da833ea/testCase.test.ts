import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.asech()', () => {
  it('should correctly compute the inverse hyperbolic secant for a specific complex number', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.asech();
    // The expected result is computed based on the original implementation
    // For c = 0.5 + 0.5i, the correct asech should be approximately:
    const expectedRe = 0.5108256237659907;
    const expectedIm = -0.4532761776387939;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});