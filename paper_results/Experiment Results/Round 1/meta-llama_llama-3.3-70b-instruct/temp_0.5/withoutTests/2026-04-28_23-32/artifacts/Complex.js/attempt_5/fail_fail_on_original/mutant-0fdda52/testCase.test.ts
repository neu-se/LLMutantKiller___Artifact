import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should calculate the hypot correctly', () => {
    const result1 = Complex.hypot(4, 3);
    const result2 = Complex.hypot(3, 4);
    expect(result1).toBeCloseTo(result2);
  });
});