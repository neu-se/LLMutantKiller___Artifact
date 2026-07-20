import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 3001;
    const result = new Complex(a, b).abs();
    expect(result).toBeCloseTo(Math.sqrt(a * a + b * b));
  });
});