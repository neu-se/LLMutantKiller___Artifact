import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul optimization for real numbers", () => {
  it("should return positive zero imaginary part when multiplying two real numbers (both im === 0)", () => {
    // Create a complex number with im = -0 (negative zero)
    const a = new Complex(3, -0);
    const b = new Complex(4, 0);
    const result = a.mul(b);

    // In the original code, when z['im'] === 0 && this['im'] === 0,
    // the optimization path is taken: new Complex(this['re'] * z['re'], 0)
    // which gives im = +0 (positive zero).
    //
    // In the mutated code, this[""] is undefined, so undefined === 0 is false,
    // the optimization is skipped and the general formula is used:
    // im = this['re'] * z['im'] + this['im'] * z['re']
    //    = 3 * 0 + (-0) * 4 = 0 + (-0) = -0 (negative zero)
    //
    // -0 === 0 is true in JS, but 1 / (-0) === -Infinity while 1 / 0 === Infinity
    // So we can distinguish +0 from -0 using division.

    // Original: im is +0, so 1/im = +Infinity
    // Mutated: im is -0, so 1/im = -Infinity
    expect(1 / result.im).toBe(Infinity);
  });
});