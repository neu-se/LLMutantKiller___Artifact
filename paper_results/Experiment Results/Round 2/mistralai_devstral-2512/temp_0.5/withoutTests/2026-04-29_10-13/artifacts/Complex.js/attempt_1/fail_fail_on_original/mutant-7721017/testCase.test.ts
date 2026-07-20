import { Complex } from "./complex.js";

describe("Complex.pow", () => {
  it("should correctly handle zero base with non-zero exponent", () => {
    const base = new Complex(0, 0);
    const exponent = new Complex(2, 0);
    const result = base.pow(exponent);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});