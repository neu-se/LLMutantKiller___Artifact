import { Complex } from "./complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3;
    const b = 4;
    const result1 = Complex.hypot(a, b);
    const result2 = Complex.hypot(b, a);
    expect(result1).toBeCloseTo(result2);
  });
});