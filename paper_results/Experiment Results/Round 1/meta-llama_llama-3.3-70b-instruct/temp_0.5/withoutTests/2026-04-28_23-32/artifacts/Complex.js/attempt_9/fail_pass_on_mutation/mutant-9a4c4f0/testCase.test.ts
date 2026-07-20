import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should return the correct result for expm1 function with small input and precise comparison', () => {
    const complex = new Complex(1e-8, 0);
    const result = complex.expm1();
    const expected = new Complex(Math.expm1(1e-8), 0);
    expect(result.re).toBeCloseTo(expected.re, 12);
    expect(result.im).toBeCloseTo(expected.im, 12);
    expect(Math.abs(result.re - expected.re)).toBeLessThan(1e-12);
  });
});