import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 3001;
    const result1 = Complex.hypot(a, b);
    const result2 = Complex.hypot(b, a);
    expect(result1).toBeCloseTo(result2);
    expect(result1).toBeCloseTo(Math.sqrt(a * a + b * b));
  });
});