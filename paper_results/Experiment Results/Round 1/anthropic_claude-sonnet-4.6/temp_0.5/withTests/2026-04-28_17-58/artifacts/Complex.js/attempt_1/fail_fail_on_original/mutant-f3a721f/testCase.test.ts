import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex equals method boundary condition", () => {
  it("should return true when the difference between real parts is exactly EPSILON", () => {
    const epsilon = Complex['EPSILON']; // 1e-15
    const c1 = new Complex(1, 0);
    const c2 = new Complex(1 + epsilon, 0);
    // In original code: Math.abs(diff) <= EPSILON should be true when diff === EPSILON
    // In mutated code: Math.abs(diff) < EPSILON should be false when diff === EPSILON
    expect(c1.equals(c2)).toBe(true);
  });
});