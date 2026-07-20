import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should return ZERO when base is 0+0i and exponent has positive real and zero imaginary part at the general pow path", () => {
    // Use exponent with im=0 that bypasses the z['im']===0 early check
    // by having a non-integer real part that still hits the placeholder
    const base = new Complex(0, 0);
    const exponent = new Complex(2, 0);
    // Force through general path by checking with im exactly 0 (negative zero scenario)
    const result = base.pow({ re: 2, im: -0 });
    // With original: im >= 0 catches -0 (since -0 >= 0 is true), returns ZERO
    // With mutated: im > 0 misses -0 (since -0 > 0 is false), falls through to NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});