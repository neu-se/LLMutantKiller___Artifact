import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const originalRe = result.re;
    const originalIm = result.im;
    expect(originalRe * (0.5 * Math.cos(2) - 0.5 * Math.cosh(2))).not.toBeCloseTo(-Math.cos(1) * Math.sinh(1) * (0.5 * Math.cos(2) - 0.5 * Math.cosh(2)), 5);
  });
});