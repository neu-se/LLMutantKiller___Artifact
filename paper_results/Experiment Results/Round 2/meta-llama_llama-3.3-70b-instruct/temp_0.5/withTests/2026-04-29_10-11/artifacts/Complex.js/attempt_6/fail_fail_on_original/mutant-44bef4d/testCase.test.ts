import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 2);
    const a = complex.re;
    const b = complex.im;
    const d = a * a + b * b;
    const resultOriginal = new Complex(a / d, -b / d).asin();
    const result = complex.acsc();
    expect(result.re).toBeCloseTo(resultOriginal.re, 10);
    expect(result.im).toBeCloseTo(resultOriginal.im, 10);
  });
});