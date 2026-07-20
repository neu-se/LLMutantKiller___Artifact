import { Complex } from "./complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant of a complex number", () => {
    const z = new Complex(1, 0.5);
    const result = z.sech();
    const expectedRe = 2 * Math.cosh(1) * Math.cos(0.5) / (Math.cos(1) + Math.cosh(1));
    const expectedIm = -2 * Math.sinh(1) * Math.sin(0.5) / (Math.cos(1) + Math.cosh(1));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});