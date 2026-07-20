import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosh correctly for a specific complex input where the mutation has an effect', () => {
    const complex = new Complex(0, 1);
    const result = complex.cosh();
    const expectedRe = Math.cosh(0) * Math.cos(1);
    const expectedIm = Math.sinh(0) * Math.sin(1);
    expect(result.re).toBeCloseTo(expectedRe);
    expect(result.im).toBeCloseTo(expectedIm);
  });
});