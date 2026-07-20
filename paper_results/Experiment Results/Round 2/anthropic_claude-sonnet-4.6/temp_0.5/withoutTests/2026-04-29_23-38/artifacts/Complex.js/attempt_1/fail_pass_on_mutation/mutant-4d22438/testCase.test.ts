import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs with large values", () => {
  it("should correctly compute the absolute value of a complex number with large components", () => {
    // Both components >= 3000 and |im| > |re|, triggering the hypot branch
    // where b = y / x (original) vs b = y * x (mutated)
    // For (3000, 4000): expected abs = sqrt(3000^2 + 4000^2) = sqrt(9000000 + 16000000) = sqrt(25000000) = 5000
    const c = new Complex(3000, 4000);
    const result = c.abs();
    expect(result).toBeCloseTo(5000, 5);
  });
});