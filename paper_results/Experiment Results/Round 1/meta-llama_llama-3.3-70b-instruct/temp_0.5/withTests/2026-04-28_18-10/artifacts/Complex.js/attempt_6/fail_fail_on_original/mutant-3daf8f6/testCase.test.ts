import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const a = 2999.999999999999;
    const b = 0;
    const complex = new Complex(a, b);
    const result = complex.abs();
    expect(result).toBeCloseTo(a, 15);
  });
});