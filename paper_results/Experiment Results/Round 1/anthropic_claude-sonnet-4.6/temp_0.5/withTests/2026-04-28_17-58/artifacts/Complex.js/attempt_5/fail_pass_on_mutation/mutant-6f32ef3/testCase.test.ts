import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex toString", () => {
  it("should correctly format number where real becomes zero via epsilon and imaginary is negative", () => {
    // a = 5e-16 (< EPSILON, becomes 0), b = -2 (stays -2)
    // a !== 0 is FALSE (a became 0)
    // else if (b < 0): -2 < 0 TRUE on both
    // b = 2, ret = "-", then "2i" → "-2i"
    const c = new Complex(5e-16, -2);
    expect(c.toString()).toBe("-2i");
  });
});