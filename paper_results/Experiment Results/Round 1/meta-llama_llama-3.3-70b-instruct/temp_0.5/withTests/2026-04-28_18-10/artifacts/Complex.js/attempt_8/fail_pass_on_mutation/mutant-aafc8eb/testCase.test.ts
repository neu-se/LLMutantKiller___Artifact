import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate expm1 correctly for small values with precise comparison and check for NaN', () => {
    const x = 1e-9;
    const complex = new Complex(x);
    const result = complex.expm1();
    const expected = complex.exp().sub(1);
    expect(result.re).toBeCloseTo(expected.re, 15);
    expect(result.im).toBeCloseTo(expected.im, 15);
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);
  });
});