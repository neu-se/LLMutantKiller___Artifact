import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate the complex atanh correctly', () => {
    const complex = new Complex(1, 1);
    const result = complex.atanh();
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});