import { Complex } from "./complex.js";

describe("Complex multiplication with zero and infinity", () => {
  it("should return NaN when multiplying zero by infinity", () => {
    const zero = new Complex(0, 0);
    const infinity = new Complex(Infinity, Infinity);
    const result = zero.mul(infinity);
    expect(result.isNaN()).toBe(true);
  });
});