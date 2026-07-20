import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should correctly format complex number with imaginary part at EPSILON boundary", () => {
    // b = 1e-15 is exactly EPSILON, NOT less than EPSILON
    // Math.abs(1e-15) < 1e-15 is FALSE, so b stays 1e-15
    // Early return doesn't fire
    // At mutation: b < 0 is FALSE, b <= 0 is FALSE (b = 1e-15 > 0)
    // Both versions add "+" -> same result
    const c = new Complex(3, 1e-15);
    expect(c.toString()).toContain("+");
  });
});