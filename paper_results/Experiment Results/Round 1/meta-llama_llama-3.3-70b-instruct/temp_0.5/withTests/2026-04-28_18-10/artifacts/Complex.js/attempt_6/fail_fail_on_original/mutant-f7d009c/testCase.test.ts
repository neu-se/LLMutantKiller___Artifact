import { Complex } from './complex';

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const result = Complex.hypot(a, b);
    expect(result).not.toBeCloseTo(Complex.hypot(a, b + 1), 10);
  });
});