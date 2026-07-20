import { Complex } from "./complex.js";

describe("Complex.sech", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    const c = new Complex(1, 0);
    const result = c.sech();
    expect(result.re).toBeCloseTo(1 / Math.cosh(1));
    expect(result.im).toBeCloseTo(0);
  });
});