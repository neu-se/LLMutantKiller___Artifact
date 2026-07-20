import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate the complex hyperbolic sine correctly', () => {
    const x = 0.5;
    const complex = new Complex(x, 0);
    const sinh = complex.sinh();
    const expectedSinh = Math.sinh(x);
    const tolerance = Math.abs((Math.exp(x) - Math.exp(-x)) * 0.5 - expectedSinh);
    expect(Math.abs(sinh.re - expectedSinh)).toBeLessThan(tolerance);
  });
});