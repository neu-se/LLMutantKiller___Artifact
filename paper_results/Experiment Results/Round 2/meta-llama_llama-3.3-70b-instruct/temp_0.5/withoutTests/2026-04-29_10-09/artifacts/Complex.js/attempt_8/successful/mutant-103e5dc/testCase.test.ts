import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(2, 1);
    const cscOriginal = complex.csc();
    const a = complex.re;
    const b = complex.im;
    const dOriginal = 0.5 * Math.cosh(2 * b) - 0.5 * Math.cos(2 * a);
    const csc = new Complex(
      Math.sin(a) * Math.cosh(b) / dOriginal,
      -Math.cos(a) * Math.sinh(b) / dOriginal);
    expect(csc.re).toBeCloseTo(cscOriginal.re);
    expect(csc.im).toBeCloseTo(cscOriginal.im);
  });
});