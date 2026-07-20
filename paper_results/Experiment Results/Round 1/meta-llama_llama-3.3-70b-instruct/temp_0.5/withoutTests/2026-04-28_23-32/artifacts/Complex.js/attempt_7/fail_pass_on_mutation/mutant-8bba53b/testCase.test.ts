import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for small values', () => {
    const complex = new Complex(1e-9, 0);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(1e-9), 0);
    const diff = Math.abs(result.re - expected.re);
    expect(diff).toBeLessThan(1e-9);
  });
});