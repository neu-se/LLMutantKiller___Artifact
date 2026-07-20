import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for small values using taylor series', () => {
    const x = 1e-9;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(x), 0);
    expect(Math.abs(result.re - expected.re) < 1e-15).toBe(true);
    expect(Math.abs(result.im - expected.im) < 1e-15).toBe(true);
  });
});