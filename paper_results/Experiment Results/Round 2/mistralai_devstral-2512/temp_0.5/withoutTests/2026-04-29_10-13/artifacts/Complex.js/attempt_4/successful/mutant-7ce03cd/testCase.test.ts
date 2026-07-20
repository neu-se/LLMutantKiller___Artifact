import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication edge cases", () => {
  it("should return NaN when multiplying zero by Infinity", () => {
    const zero = new Complex(0, 0);
    const infinity = Complex.INFINITY;
    const result = zero.mul(infinity);
    expect(result.isNaN()).toBe(true);
  });
});