import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should handle non-zero real and imaginary parts correctly", () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.5493061443340548);
    expect(result.im).toBeCloseTo(-0.5493061443340548);
  });
});