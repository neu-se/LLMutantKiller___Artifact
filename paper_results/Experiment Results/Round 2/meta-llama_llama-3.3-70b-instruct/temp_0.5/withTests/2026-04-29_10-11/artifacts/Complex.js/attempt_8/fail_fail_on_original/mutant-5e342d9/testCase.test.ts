import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should correctly calculate the hypot function for large numbers', () => {
    const result1 = Complex.hypot(3000, 3000);
    const result2 = Complex.hypot(3000, 3000);
    expect(result1).toBeCloseTo(result2);
    expect(result1).toBeCloseTo(Math.sqrt(3000 * 3000 + 3000 * 3000));
  });
});