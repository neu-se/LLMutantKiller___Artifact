import { Complex } from "./complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    const c = new Complex(1, 0);
    const result = c.sech();
    const expectedRe = 1 / Math.cosh(1);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});