import { Complex } from "./complex.js";

describe("Complex division", () => {
  it("should return ZERO when dividing zero by infinity", () => {
    const zero = new Complex(0, 0);
    const infinity = new Complex(Infinity, Infinity);
    const result = zero.div(infinity);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});