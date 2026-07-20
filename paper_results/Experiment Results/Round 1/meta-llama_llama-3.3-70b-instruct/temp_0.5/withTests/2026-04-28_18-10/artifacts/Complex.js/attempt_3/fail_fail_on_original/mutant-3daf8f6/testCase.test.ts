import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const complex = new Complex(a, b);
    const result = complex.abs();
    expect(result).toBeCloseTo(Math.sqrt(a * a + b * b));
  });
});