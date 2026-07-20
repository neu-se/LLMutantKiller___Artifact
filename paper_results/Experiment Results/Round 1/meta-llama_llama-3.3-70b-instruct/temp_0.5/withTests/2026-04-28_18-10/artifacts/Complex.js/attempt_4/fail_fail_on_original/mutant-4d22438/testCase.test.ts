import { Complex } from './complex';

describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const result = Complex.hypot(3, 4);
    expect(result).toBeCloseTo(5);
  });
});