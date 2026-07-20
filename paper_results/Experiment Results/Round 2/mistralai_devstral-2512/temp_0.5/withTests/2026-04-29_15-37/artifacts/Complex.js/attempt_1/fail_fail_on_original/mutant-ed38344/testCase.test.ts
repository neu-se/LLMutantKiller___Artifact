import { Complex } from "./complex.js";

describe("Complex subtraction with infinite values", () => {
  it("should return NaN when subtracting two infinite complex numbers", () => {
    const infinity = Complex.INFINITY;
    const result = infinity.sub(infinity);
    expect(result.isNaN()).toBe(true);
  });
});