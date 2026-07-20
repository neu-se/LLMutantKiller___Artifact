import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for small values with precise comparison', () => {
    const x = 1e-10;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = complex.exp().sub(1);
    const diff = Math.abs(result.re - expected.re) + Math.abs(result.im - expected.im);
    expect(diff).toBeLessThan(1e-15);
  });
});