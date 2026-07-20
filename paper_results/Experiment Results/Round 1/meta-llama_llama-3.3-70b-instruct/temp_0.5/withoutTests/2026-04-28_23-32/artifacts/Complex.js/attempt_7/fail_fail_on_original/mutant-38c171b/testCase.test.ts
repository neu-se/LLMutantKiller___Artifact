import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for acsch when b is not zero', () => {
    const complex = new Complex(0, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Infinity, 10);
  });

  it('should return the correct result for acsch when b is zero', () => {
    const complex = new Complex(0, 0);
    const result = complex.acsch();
    expect(result.im).not.toBe(0);
  });
});