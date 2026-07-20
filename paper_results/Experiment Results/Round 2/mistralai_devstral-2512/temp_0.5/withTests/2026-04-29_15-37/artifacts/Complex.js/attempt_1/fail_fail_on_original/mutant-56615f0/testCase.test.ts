import { Complex } from "./complex.js";

describe("Complex.acsch", () => {
  it("should compute the inverse hyperbolic cosecant of a complex number", () => {
    const c = new Complex(1, 0);
    const result = c.acsch();
    expect(result.re).toBeCloseTo(0.881373587019543, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});