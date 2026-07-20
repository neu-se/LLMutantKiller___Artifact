import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul with zero and infinity", () => {
  it("should return NaN when zero is multiplied by infinity", () => {
    // In the original code: (this['isInfinite']() && z['isZero']()) || (this['isZero']() && z['isInfinite']())
    // In the mutated code: (this['isInfinite']() && z['isZero']()) || (false)
    // So the mutation breaks the case where zero * infinity should return NaN
    const zero = new Complex(0, 0);
    const infinity = Complex.INFINITY;
    
    // zero.mul(infinity) should return NaN (this['isZero']() && z['isInfinite']())
    const result = zero.mul(infinity);
    
    expect(result.isNaN()).toBe(true);
  });
});