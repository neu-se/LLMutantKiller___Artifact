import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs() with large values", () => {
  it("should correctly compute the absolute value (hypot) for large real and imaginary parts", () => {
    // This tests the hypot function's large-value branch (a >= 3000 && b >= 3000)
    // with a >= b case, which uses b = x/y (original) vs b = x*y (mutated)
    // For (4000, 3000): hypot = sqrt(4000^2 + 3000^2) = sqrt(16000000 + 9000000) = sqrt(25000000) = 5000
    const c = new Complex(4000, 3000);
    const result = c.abs();
    expect(result).toBeCloseTo(5000, 5);
  });
});