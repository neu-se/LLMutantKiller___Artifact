import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate the complex hyperbolic sine correctly', () => {
    const x = 1;
    const sinhOriginal = Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
    const complex = new Complex(1, 0);
    const sinh = complex.sinh();
    expect(sinh.re).toBeCloseTo(sinhOriginal);
  });
});