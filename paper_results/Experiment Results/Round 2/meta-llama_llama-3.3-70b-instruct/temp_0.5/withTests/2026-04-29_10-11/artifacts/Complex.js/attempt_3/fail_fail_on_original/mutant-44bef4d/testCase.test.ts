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
    const resultMutated = new Complex(
      a / d,
      -b * d).asin();
    expect(resultOriginal.re).not.toBeCloseTo(resultMutated.re, 10);
    expect(resultOriginal.im).not.toBeCloseTo(resultMutated.im, 10);
  });
});