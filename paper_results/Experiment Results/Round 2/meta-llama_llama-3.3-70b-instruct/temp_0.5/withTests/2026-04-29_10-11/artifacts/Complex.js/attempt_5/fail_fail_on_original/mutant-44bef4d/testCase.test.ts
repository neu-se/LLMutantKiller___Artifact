import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acsc', () => {
    const complex = new Complex(1, 2);
    const a = complex.re;
    const b = complex.im;
    const d = a * a + b * b;
    const resultOriginal = new Complex(
      a / d,
      -b / d).asin();
    const result = complex.acsc();
    expect(Math.abs(result.re - resultOriginal.re) < 1e-9).toBe(true);
    expect(Math.abs(result.im - resultOriginal.im) < 1e-9).toBe(true);
  });
});