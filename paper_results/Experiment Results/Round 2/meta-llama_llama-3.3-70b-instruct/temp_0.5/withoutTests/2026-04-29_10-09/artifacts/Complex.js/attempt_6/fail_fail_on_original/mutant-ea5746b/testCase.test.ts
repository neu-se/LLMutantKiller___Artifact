import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for small values', () => {
    const complex = new Complex(0.00001);
    const expm1 = complex.expm1();
    const expected = Math.exp(0.00001) - 1;
    const tolerance = 1e-5;
    expect(Math.abs(expm1.re - expected)).toBeLessThan(tolerance);
    expect(Math.abs(expm1.im)).toBeLessThan(tolerance);
  });
});