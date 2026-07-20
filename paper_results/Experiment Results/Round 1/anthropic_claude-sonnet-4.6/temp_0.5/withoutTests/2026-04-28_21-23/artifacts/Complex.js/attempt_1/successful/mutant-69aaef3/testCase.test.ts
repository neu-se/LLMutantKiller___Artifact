import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs() with large values", () => {
  it("should correctly compute the absolute value when components are >= 3000", () => {
    // This triggers the large-value branch in hypot where a >= 3000 or b >= 3000
    // Original: hypot(3000, 4000) = 5000
    // Mutated: hypot uses b/b instead of b*b, giving wrong result (~5656.85)
    const c = new Complex(3000, 4000);
    const result = c.abs();
    expect(result).toBeCloseTo(5000, 5);
  });
});