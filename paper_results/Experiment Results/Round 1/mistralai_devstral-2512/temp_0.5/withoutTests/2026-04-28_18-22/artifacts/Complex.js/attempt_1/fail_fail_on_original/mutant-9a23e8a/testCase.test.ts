import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute the inverse hyperbolic cosecant for real numbers", () => {
    const c = new Complex(2, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(4 + 1)));
    expect(result.im).toBe(0);
  });
});