import { Complex } from './complex.js';

describe('Complex', () => {
  it('should handle hypot correctly', () => {
    const complex = new Complex(3000, 0.000001);
    const result = complex.abs();
    expect(result).toBeCloseTo(3000, 10);
  });
});