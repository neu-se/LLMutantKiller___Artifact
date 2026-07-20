import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate the complex hyperbolic sine correctly', () => {
    const x = 10;
    const complex = new Complex(x, 0);
    const sinh = complex.sinh();
    const expectedSinh = Math.sinh(x);
    expect(Math.abs(sinh.re - expectedSinh)).toBeLessThan(1e-6);
    const sinhValue = Math.abs(x) < 1e-9 ? x : (Math.exp(x) - Math.exp(-x)) * 0.5;
    expect(Math.abs(sinhValue - expectedSinh)).toBeLessThan(1e-6);
  });
});