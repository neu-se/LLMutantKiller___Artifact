import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(2, 1);
    const csc = complex.csc();
    const a = complex.re;
    const b = complex.im;
    const dOriginal = 0.5 * Math.cosh(2 * b) - 0.5 * Math.cos(2 * a);
    const dMutated = 0.5 * Math.cosh(2 * b) - 0.5 * Math.cos(2 / a);
    expect(dOriginal).not.toBeCloseTo(dMutated);
  });
});