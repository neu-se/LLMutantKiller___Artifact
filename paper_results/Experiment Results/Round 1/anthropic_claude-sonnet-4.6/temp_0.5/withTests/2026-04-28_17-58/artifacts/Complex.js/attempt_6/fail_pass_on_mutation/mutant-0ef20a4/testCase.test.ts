import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("inverse of zero multiplied by zero should not be NaN", () => {
    const zero = new Complex(0, 0);
    const inv = zero.inverse();
    // On original: inv = INFINITY, inv.mul(zero) = NaN (Infinity * 0)
    // On mutated: inv = NaN complex, so toString = 'NaN'
    // Key difference: original inv.toString() = 'Infinity', mutated = 'NaN'
    expect(inv.toString()).toBe('Infinity');
  });
});