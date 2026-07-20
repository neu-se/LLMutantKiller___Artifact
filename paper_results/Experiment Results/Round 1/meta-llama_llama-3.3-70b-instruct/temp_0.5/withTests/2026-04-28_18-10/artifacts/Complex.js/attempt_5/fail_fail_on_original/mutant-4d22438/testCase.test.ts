import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate hypot correctly for large numbers', () => {
    const result = Complex.hypot(3000, 3001);
    expect(result).toBeCloseTo(4242.64);
  });
});