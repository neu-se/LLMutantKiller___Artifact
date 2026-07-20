import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul with zero", () => {
  it("should return zero when multiplying zero by a finite non-zero complex number", () => {
    // In the original code, the NaN check in mul is:
    // (this['isInfinite']() && z['isZero']()) || (this['isZero']() && z['isInfinite']())
    // When this is zero and z is finite non-zero: both conditions false, proceeds normally
    //
    // In the mutated code, the NaN check becomes:
    // (this['isInfinite']() && z['isZero']()) || (this['isZero']() && z[""]())
    // When this.isZero() is true, z[""]() is called - z[""] is undefined -> TypeError thrown
    const zero = new Complex(0, 0);
    const z = new Complex(3, 4);
    const result = zero.mul(z);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});