import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should return a non-NaN infinite result when inverting zero", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    // Original: returns Complex.INFINITY (re=Infinity, im=Infinity)
    // Mutated: skips isZero check, computes 0/0 = NaN, returns NaN complex
    expect(result.isNaN()).toBe(false);
    expect(result.isInfinite()).toBe(true);
  });
});