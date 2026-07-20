import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const result = Complex.hypot(a, b);
    expect(result).toBeCloseTo(Math.sqrt(a * a + b * b), 10);
    expect(Complex.hypot(a, b)).not.toBeCloseTo(Math.sqrt(a * a + (b + 1) * (b + 1)), 10);
  });
});