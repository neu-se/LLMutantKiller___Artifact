import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 2);
    const result = complex.acsc();
    const expected = new Complex(
      complex.re / (complex.re * complex.re + complex.im * complex.im),
      -complex.im / (complex.re * complex.re + complex.im * complex.im)).asin();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});