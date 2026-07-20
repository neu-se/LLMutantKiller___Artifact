import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant for a complex number with non-zero imaginary part", () => {
    const c = new Complex(0.1, 0.1);
    const result = c.sech();
    const denominator = Math.cos(0.2) - Math.cosh(0.2);
    const expectedRe = 2 * Math.cosh(0.1) * Math.cos(0.1) / denominator;
    const expectedIm = -2 * Math.sinh(0.1) * Math.sin(0.1) / denominator;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});