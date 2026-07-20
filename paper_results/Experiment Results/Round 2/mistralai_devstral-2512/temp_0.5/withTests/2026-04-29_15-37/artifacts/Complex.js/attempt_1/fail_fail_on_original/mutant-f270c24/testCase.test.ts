import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should correctly compute the inverse hyperbolic cosecant for a purely real number", () => {
    const c = new Complex(2, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(5)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});