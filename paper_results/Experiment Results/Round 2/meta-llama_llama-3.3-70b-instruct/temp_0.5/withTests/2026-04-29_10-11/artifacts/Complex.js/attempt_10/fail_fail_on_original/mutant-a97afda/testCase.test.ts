import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return the correct result for atan when a is 0 and b is 1, and return the same result when a is 0 and b is any value', () => {
    const complex1 = new Complex(0, 1);
    const complex2 = new Complex(0, 2);
    const result1 = complex1.atan();
    const result2 = complex2.atan();
    expect(result1.re).toBeCloseTo(result2.re, 10);
    expect(result1.im).toBeCloseTo(result2.im, 10);
  });
});