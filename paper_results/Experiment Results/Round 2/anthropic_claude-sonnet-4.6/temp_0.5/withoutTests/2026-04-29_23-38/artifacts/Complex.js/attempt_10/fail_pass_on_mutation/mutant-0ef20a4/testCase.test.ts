import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("inverse of zero should equal Complex.INFINITY", () => {
    const zero = new Complex(0, 0);
    const inv = zero.inverse();
    // Original: returns Complex.INFINITY (Infinity, Infinity)
    // Mutated: skips isZero, falls through, d=0, returns (0/0, -0/0) = (NaN, NaN)
    // NaN !== Infinity so toString would differ
    expect(inv.toString()).toBe('Infinity');
  });
});