import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return different results for different inputs in the atan function', () => {
    const complex1 = new Complex(0, 1);
    const complex2 = new Complex(0, 2);
    const result1 = complex1.atan();
    const result2 = complex2.atan();
    expect(result1.re).not.toBeCloseTo(result2.re, 10);
    expect(result1.im).not.toBeCloseTo(result2.im, 10);
  });
});