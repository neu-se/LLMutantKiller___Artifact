import { Complex } from '../complex';

describe('Complex.js', () => {
  it('should calculate hypot correctly for numbers just below the threshold', () => {
    const result1 = Complex.hypot(2999.999, 3000);
    const result2 = Complex.hypot(3000, 2999.999);
    expect(result1).toBeCloseTo(result2, 4);
  });
});