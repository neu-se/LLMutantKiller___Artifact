import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3001;
    const b = 3000;
    const result = Complex.hypot(a, b);
    expect(result).toBeCloseTo(Math.sqrt(a * a + b * b));
  });
});