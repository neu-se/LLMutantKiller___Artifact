import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul fast path for real numbers", () => {
  it("should produce positive zero imaginary part when multiplying real numbers via fast path", () => {
    // Original fast path: returns new Complex(this['re'] * z['re'], 0) — im is literally 0
    // Mutated skips fast path, uses general formula:
    //   im = this['re'] * z['im'] + this['im'] * z['re']
    //      = (-3) * 0 + 0 * 0 = -0 (in JS, negative * 0 = -0)
    // So: Object.is(result.im, -0) would be true in mutated, false in original

    const a = new Complex(-3, 0);
    const b = new Complex(0, 0);
    const result = a.mul(b);

    // Fast path (original): im = 0 (positive zero)
    // General formula (mutated): im = (-3)*0 + 0*0 = -0
    expect(Object.is(result.im, -0)).toBe(false);
    expect(Object.is(result.im, 0)).toBe(true);
  });
});