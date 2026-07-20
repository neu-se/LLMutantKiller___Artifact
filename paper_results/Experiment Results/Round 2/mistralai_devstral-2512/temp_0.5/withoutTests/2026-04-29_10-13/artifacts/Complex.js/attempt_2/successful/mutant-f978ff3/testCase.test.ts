import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch()", () => {
  it("should correctly compute the hyperbolic cosecant for a complex number with non-zero real and imaginary parts", () => {
    const c = new Complex(1, 1);
    const result = c.csch();
    const expectedRe = -2 * Math.sinh(1) * Math.cos(1) / (Math.cos(2) - Math.cosh(2));
    const expectedIm = 2 * Math.cosh(1) * Math.sin(1) / (Math.cos(2) - Math.cosh(2));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});