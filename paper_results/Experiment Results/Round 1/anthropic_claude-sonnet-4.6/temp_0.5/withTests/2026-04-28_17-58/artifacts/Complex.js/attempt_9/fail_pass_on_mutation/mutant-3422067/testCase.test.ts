import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs", () => {
  it("abs matches Math.hypot for large values", () => {
    // For a=3000, b=3000: first condition (a < 3000) is FALSE
    // overflow-safe path is used
    // Original: else branch (a < b is false)
    // Mutated: if branch (a <= b is true)  
    // Both give 3000 * sqrt(2), same as Math.hypot
    const x = 3000, y = 3000;
    expect(new Complex(x, y).abs()).toBe(Math.hypot(x, y));
  });
});