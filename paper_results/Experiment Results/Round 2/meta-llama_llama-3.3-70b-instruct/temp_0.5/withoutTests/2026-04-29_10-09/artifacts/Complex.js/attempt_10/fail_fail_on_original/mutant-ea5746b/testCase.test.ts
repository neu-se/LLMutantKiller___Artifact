import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for small x', () => {
    const x = 0.0001;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = Math.exp(x) - 1;
    const tolerance = 1e-5;
    expect(Math.abs(result.re - expected)).toBeLessThan(tolerance);
    expect(Math.abs(result.im)).toBeLessThan(tolerance);
  });
});