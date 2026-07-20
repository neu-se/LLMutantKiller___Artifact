import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("inverse of zero should have Infinity as real part, not NaN", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    // Original: returns Complex.INFINITY where re=Infinity, im=Infinity
    // Mutated: skips zero check, computes 0/0=NaN
    expect(Number.isNaN(result.re)).toBe(false);
    expect(Number.isFinite(result.re)).toBe(false);
    expect(result.re).toBe(Infinity);
    expect(result.im).toBe(Infinity);
  });
});