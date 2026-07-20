import { Complex } from "../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const result1 = Complex.hypot(3000, 2999);
    const result2 = Math.sqrt(3000 * 3000 + 2999 * 2999);
    expect(result1).toBeCloseTo(result2, 10);
  });
});