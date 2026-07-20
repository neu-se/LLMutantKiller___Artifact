import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("inverse of zero should equal Complex INFINITY, not NaN", () => {
    const result = new Complex(0, 0).inverse();
    // Original: returns Complex.INFINITY (re=Infinity, im=Infinity)
    // Mutated: skips isZero check, computes 0/0 = NaN
    expect(isNaN(result.re)).toBe(false);
  });
});