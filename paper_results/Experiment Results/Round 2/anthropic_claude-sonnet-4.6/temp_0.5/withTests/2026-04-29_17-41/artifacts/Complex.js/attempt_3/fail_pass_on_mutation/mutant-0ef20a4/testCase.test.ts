import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should return NaN-free infinity when inverting zero, not NaN", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    // Original code: isZero() check triggers, returns Complex.INFINITY
    // Mutated code: isZero() check is skipped (if false), falls through to 0/0 = NaN
    expect(result.isNaN()).toBe(false);
  });
});