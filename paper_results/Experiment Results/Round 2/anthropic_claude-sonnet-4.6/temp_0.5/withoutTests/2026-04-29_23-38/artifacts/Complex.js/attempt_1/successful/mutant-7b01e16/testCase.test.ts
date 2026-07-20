import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul with zero and infinity", () => {
  it("should return NaN when zero is multiplied by infinity", () => {
    const zero = new Complex(0, 0);
    const infinity = Complex.INFINITY;
    
    const result = zero.mul(infinity);
    
    expect(result.isNaN()).toBe(true);
  });
});