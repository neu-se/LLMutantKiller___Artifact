import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate the complex hyperbolic sine correctly', () => {
    const x = 1;
    const complex = new Complex(x, 0);
    const sinh = complex.sinh();
    expect(sinh.re).toBeCloseTo(Math.sinh(x));
    expect(sinh.im).toBeCloseTo(0);
    const sinhValue = Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
    expect(sinhValue).toBeCloseTo(Math.sinh(x));
  });
});