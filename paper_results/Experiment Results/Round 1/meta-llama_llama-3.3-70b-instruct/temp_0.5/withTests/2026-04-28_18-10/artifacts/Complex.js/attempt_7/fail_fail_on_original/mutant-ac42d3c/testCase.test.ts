import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should return a result for atan when b is not -1', () => {
    const complex = new Complex(0, 1);
    const result = complex.atan();
    expect(result).not.toBeNull();
  });

  it('should return a specific result for atan when b is -1', () => {
    const complex = new Complex(0, -1);
    const result = complex.atan();
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});