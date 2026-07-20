import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should return a NaN-free result when inverting zero (should be Infinity, not NaN)", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    // Original: returns Complex.INFINITY (re=Infinity, im=Infinity)
    // Mutated: skips isZero check, computes 0/0 = NaN
    expect(result.isNaN()).toBe(false);
  });
});