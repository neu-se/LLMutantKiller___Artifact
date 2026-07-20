import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const result1 = Complex.hypot(3001, 1);
    const result2 = Math.sqrt(3001 * 3001 + 1 * 1);
    expect(result1).toBeCloseTo(result2);
  });
});