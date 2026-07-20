import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex abs with large values', () => {
  it('should correctly calculate the absolute value when values exceed 3000', () => {
    // For a = 3000, b = 4000: hypot(3000, 4000) should be 5000
    // In the large number path (b=4000 >= 3000, a=3000 >= 3000):
    // Since a(3000) < b(4000): a=4000, b=3000/4000=0.75
    // Original: return 4000 * sqrt(1 + 0.75^2) = 4000 * sqrt(1.5625) = 4000 * 1.25 = 5000
    // Mutated: return 4000 / sqrt(1 + 0.75^2) = 4000 / 1.25 = 3200
    const c = new Complex(3000, 4000);
    expect(c.abs()).toBeCloseTo(5000, 5);
  });
});