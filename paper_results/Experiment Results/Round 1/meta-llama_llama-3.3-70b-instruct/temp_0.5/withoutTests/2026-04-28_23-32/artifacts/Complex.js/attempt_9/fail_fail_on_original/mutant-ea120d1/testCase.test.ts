import { Complex } from './complex';

describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const result = Complex.hypot(3000, 3000);
    expect(result).toBeCloseTo(4242.6407);
  });
});