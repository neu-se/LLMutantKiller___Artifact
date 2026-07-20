import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const result = Complex.hypot(a, b);
    expect(result).toBeCloseTo(Math.sqrt(a * a + b * b), 10);
    const result2 = Complex.hypot(a, b + 1);
    expect(result2).toBeCloseTo(Math.sqrt(a * a + (b + 1) * (b + 1)), 10);
    expect(result).not.toBeCloseTo(result2, 10);
  });
});