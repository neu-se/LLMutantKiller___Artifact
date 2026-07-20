import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate cosm1 correctly', () => {
    const x = 0.1;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = Math.expm1(x) * Math.cos(x) + Math.cos(x) - 1;
    expect(Math.abs(result.re - expected) < 1e-9).toBe(true);
  });
});