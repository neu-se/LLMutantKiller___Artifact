import { Complex } from "./complex.js";

describe("Complex.pow", () => {
  it("should handle zero base with positive real exponent correctly", () => {
    const zero = new Complex(0, 0);
    const result = zero.pow(1, 0);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});