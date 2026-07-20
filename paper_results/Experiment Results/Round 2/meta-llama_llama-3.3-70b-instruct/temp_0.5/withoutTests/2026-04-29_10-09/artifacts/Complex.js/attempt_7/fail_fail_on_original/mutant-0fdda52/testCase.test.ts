import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3;
    const b = 4;
    const result = Complex.hypot(a, b);
    const result2 = Complex.hypot(b, a);
    expect(result).toBeCloseTo(result2);
  });
});