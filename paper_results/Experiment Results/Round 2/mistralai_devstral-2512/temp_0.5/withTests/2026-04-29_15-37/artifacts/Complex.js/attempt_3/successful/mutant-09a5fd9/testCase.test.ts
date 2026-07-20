import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech() method", () => {
  it("should correctly compute the hyperbolic secant for a complex number with non-zero real part", () => {
    const c = new Complex(1, 0);
    const result = c.sech();
    const expectedRe = 2 * Math.cosh(1) * Math.cos(0) / (Math.cos(0) + Math.cosh(2 * 1));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});