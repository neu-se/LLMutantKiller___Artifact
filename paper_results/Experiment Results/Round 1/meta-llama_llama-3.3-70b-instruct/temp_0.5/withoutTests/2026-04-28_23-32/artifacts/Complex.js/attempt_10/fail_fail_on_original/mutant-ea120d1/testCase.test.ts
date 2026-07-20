import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const result = Complex.hypot(2999, 2999);
    expect(result).toBeCloseTo(4242.6407);
  });
});