import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const result = new Complex(3, 4).abs();
    expect(result).toBeCloseTo(5);
  });
});