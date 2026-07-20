import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs with large values", () => {
  it("should correctly compute the absolute value (magnitude) of a complex number with large components", () => {
    // For large values (>= 3000), hypot uses overflow-safe computation
    // Original: a * Math.sqrt(1 + b * b) where b = y/x (normalized)
    // Mutated: a * Math.sqrt(1 + b / b) = a * Math.sqrt(2) — wrong!
    // 
    // |3000 + 4000i| = 5000
    const c = new Complex(3000, 4000);
    const result = c.abs();
    expect(result).toBeCloseTo(5000, 5);
  });
});