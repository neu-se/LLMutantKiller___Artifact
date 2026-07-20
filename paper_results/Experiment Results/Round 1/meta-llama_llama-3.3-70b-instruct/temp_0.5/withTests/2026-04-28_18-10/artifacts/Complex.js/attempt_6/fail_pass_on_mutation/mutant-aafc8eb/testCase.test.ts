import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for small values', () => {
    const x = 0.000001;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = complex.exp().sub(1);
    expect(Math.abs(result.re - expected.re) < 1e-12 && Math.abs(result.im - expected.im) < 1e-12).toBe(true);
  });
});