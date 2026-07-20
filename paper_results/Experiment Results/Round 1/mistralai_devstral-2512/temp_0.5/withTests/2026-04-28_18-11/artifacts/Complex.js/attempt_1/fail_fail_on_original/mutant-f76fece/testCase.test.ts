import { Complex } from "./complex.js";

describe("Complex.equals", () => {
  it("should return true when comparing two complex numbers with equal real and imaginary parts within epsilon", () => {
    const a = new Complex(1, 1e-15);
    const b = new Complex(1, 0);
    expect(a.equals(b)).toBe(true);
  });
});