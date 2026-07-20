import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication with zero and infinity", () => {
  it("should return NaN when multiplying zero by infinity", () => {
    const zero = new Complex(0, 0);
    const infinity = Complex.INFINITY;
    
    // 0 * Infinity = NaN
    const result = zero.mul(infinity);
    
    expect(result.isNaN()).toBe(true);
  });
});