import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch()", () => {
  it("should correctly compute the hyperbolic cosecant for a complex number", () => {
    const z = new Complex(1, 1);
    const result = z.csch();
    const denominator = Math.cos(2 * z.im) - Math.cosh(2 * z.re);
    const expectedRe = 2 * Math.cosh(z.re) * Math.sin(z.im) / denominator;
    const expectedIm = -2 * Math.sinh(z.re) * Math.cos(z.im) / denominator;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});