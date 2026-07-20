import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul method - zero times infinity", () => {
  it("should return NaN when multiplying zero by infinity", () => {
    const zero = new Complex(0, 0);
    const infinity = Complex['INFINITY'];
    
    const result = zero.mul(infinity);
    
    // In the original code: (this.isZero() && z.isInfinite()) => returns NaN
    // In the mutated code: z['']() throws or returns falsy, so it falls through to return Infinity
    expect(result.isNaN()).toBe(true);
  });
});