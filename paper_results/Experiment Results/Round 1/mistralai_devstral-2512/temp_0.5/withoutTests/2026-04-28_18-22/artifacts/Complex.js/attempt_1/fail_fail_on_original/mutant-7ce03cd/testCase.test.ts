import { Complex } from "./complex.js";

describe("Complex multiplication edge cases", () => {
  it("should return NaN when multiplying Infinity by zero", () => {
    const infinity = Complex.INFINITY;
    const zero = new Complex(0, 0);
    const result = infinity.mul(zero);
    expect(result.isNaN()).toBe(true);
  });
});