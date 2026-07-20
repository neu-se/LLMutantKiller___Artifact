import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate csc correctly', () => {
    const complex = new Complex(1, 1);
    const csc = complex.csc();
    const a = complex.re;
    const b = complex.im;
    const d = 0.5 * Math.cosh(2 * b) - 0.5 * Math.cos(2 * a);
    expect(csc.re).toBeCloseTo(-Math.sin(a) * Math.cosh(b) / d);
    expect(csc.im).toBeCloseTo(Math.cos(a) * Math.sinh(b) / d);
  });
});