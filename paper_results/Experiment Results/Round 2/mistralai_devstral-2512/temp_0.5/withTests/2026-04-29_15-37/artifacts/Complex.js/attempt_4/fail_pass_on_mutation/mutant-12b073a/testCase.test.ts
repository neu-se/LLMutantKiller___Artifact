import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sinh function', () => {
  it('should correctly compute sinh for a value where the mutation would cause a significant difference', () => {
    const c = new Complex(1, 0);
    const result = c.sinh();
    // The mutation changes division by 0.5 to multiplication by 2
    // For x=1: original gives (e - 1/e)/2 ≈ 1.1752
    // Mutated gives (e - 1/e)*2 ≈ 4.701
    expect(result.re).toBeCloseTo(1.1752, 3);
    expect(result.im).toBe(0);
  });
});