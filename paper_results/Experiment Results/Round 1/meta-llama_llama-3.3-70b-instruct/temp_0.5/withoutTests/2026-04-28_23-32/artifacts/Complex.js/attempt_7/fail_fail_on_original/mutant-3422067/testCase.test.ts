import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3000;
    const b = 3001;
    const result1 = Complex.hypot(a, b);
    const result2 = Complex.hypot(b, a);
    if (a < b) {
      expect(result1).toBeCloseTo(a * Math.sqrt(1 + (b * b / (a * a))));
    } else {
      expect(result1).toBeCloseTo(b * Math.sqrt(1 + (a * a / (b * b))));
    }
    expect(result1).not.toBeCloseTo(result2);
  });
});