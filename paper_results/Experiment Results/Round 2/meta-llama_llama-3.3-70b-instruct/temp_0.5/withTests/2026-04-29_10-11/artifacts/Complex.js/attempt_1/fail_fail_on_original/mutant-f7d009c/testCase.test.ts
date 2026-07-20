import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly for values near 3000', () => {
    const a = 3000;
    const b = 3000;
    const result1 = new Complex(a, b).abs();
    const result2 = Math.sqrt(a * a + b * b);
    expect(result1.re).toBeCloseTo(result2, 10);
  });
});