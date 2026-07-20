import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const result1 = Complex.hypot(3000, 3000);
    const result2 = Complex.hypot(3000, 2999);
    expect(result1).toBeCloseTo(result2);
  });
});