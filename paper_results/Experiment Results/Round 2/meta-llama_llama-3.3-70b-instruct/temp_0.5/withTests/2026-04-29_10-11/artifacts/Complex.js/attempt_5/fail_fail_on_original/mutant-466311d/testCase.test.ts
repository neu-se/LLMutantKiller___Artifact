import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const a = 3001;
    const b = 1;
    const result1 = Complex.hypot(a, b);
    const result2 = Math.sqrt(a * a + b * b);
    expect(result1).toBeCloseTo(result2);
    const result3 = Complex.hypot(1, 3001);
    expect(result3).toBeCloseTo(Math.sqrt(1 * 1 + 3001 * 3001));
  });
});