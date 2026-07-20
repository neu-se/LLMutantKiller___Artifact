import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should compute the inverse hyperbolic cosecant of a complex number", () => {
    const c = new Complex(1, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(Math.log(1 + Math.sqrt(2)));
    expect(result.im).toBe(0);
  });
});