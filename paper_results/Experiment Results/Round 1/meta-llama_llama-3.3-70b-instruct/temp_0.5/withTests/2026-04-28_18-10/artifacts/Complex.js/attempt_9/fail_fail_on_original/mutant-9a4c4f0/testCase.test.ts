import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate the correct cosm1(x) for small x', () => {
    const x = 0.01;
    const complex = new Complex(x);
    const result = complex.expm1().re;
    const expected = Math.cos(x) - 1 + Math.expm1(x);
    expect(Math.abs(result - expected) < 1e-5).toBe(true);
  });
});