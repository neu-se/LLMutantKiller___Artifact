import { Complex } from '../complex';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const result1 = Complex.hypot(a, b);
    const result2 = Complex.hypot(a, b + 1);
    expect(result1).not.toBeCloseTo(result2, 10);
  });
});