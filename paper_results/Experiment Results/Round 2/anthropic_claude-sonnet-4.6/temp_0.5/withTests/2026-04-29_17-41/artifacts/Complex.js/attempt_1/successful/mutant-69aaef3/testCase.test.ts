import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs with large values", () => {
  it("should correctly compute the absolute value (magnitude) of a complex number with large components", () => {
    // For a 3-4-5 right triangle scaled by 1000:
    // |3000 + 4000i| should equal 5000
    const c = new Complex(3000, 4000);
    const result = c.abs();
    // Original: hypot(3000, 4000) = 5000
    // Mutated: hypot would compute 4000 * sqrt(2) ≈ 5656.85 (wrong)
    expect(result).toBeCloseTo(5000, 5);
  });
});