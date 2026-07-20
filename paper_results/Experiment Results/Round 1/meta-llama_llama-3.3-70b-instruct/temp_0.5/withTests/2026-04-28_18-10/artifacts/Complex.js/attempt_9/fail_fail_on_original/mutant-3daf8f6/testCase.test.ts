import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 0;
    const complex = new Complex(a, b);
    const result = complex.abs();
    expect(result).toBeCloseTo(a);
    expect(result).not.toBeCloseTo(Math.sqrt(a * a + b * b));
  });
});