import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should return Infinity when inverting the zero complex number", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    // Original: isZero() check returns INFINITY
    // Mutated: skips check, computes 0/0 = NaN
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});