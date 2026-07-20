import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs() with large values", () => {
  it("should correctly calculate the absolute value (hypot) for large component values", () => {
    // For complex number 3000 + 4000i, abs should be 5000
    // This tests the hypot function's large-number branch
    // Original: b = y / x gives correct result
    // Mutated: b = y * x gives wildly incorrect result
    const c = new Complex(3000, 4000);
    const result = c.abs();
    expect(result).toBeCloseTo(5000, 5);
  });
});