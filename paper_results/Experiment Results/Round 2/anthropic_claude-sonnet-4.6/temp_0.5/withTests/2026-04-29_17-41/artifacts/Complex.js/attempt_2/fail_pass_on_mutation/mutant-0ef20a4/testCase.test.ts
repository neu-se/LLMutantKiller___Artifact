import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should return a complex number with infinite real and imaginary parts when inverting zero", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    // Original: returns Complex.INFINITY (re=Infinity, im=Infinity)
    // Mutated: skips the isZero check, computes 0/0 = NaN
    expect(isFinite(result.re) || result.re === Infinity).toBe(true);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});