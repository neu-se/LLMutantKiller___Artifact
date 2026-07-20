import { Complex } from '../complex.js';

describe('Complex.js', () => {
  it('should calculate hypot correctly for numbers at the threshold', () => {
    const result1 = Complex.hypot(3000, 3000);
    const result2 = Complex.hypot(3000, 3000.0001);
    expect(result1).toBeCloseTo(result2, 4);
  });
});