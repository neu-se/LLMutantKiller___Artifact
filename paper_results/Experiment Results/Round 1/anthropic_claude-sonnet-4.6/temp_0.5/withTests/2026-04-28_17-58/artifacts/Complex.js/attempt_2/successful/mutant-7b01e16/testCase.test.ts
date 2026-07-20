import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul with zero and infinite", () => {
  it("should return NaN when zero is multiplied by infinity", () => {
    const zero = new Complex(0, 0);
    const infinity = Complex['INFINITY'];
    
    // In the original code: (this['isZero']() && z['isInfinite']()) returns NaN
    // In the mutated code: (false) means this case is not caught, so it falls through to return INFINITY
    const result = zero.mul(infinity);
    
    expect(result.isNaN()).toBe(true);
  });
});