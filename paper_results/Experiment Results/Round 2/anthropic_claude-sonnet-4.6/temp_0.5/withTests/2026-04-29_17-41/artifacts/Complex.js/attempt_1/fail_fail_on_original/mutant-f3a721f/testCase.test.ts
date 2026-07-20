import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex equals method boundary condition", () => {
  it("should return true when the difference between real parts is exactly EPSILON", () => {
    const epsilon = Complex['EPSILON']; // 1e-15
    const c1 = new Complex(1, 0);
    const c2 = new Complex(1 + epsilon, 0);
    // Original: uses <=, so difference exactly equal to EPSILON should return true
    // Mutant: uses <, so difference exactly equal to EPSILON should return false
    expect(c1.equals(c2)).toBe(true);
  });
});