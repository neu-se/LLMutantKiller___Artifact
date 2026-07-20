// Test case to detect the mutation in the sub method
import { Complex } from "./complex.js";

describe("Complex subtraction with infinity", () => {
  it("should return NaN when subtracting two infinite complex numbers", () => {
    const infinity = Complex.INFINITY;
    const result = infinity.sub(infinity);
    expect(result.isNaN()).toBe(true);
  });
});