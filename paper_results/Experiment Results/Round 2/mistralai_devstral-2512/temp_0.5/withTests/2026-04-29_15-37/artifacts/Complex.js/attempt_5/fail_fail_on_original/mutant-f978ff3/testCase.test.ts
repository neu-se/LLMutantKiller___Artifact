import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.csch()", () => {
  it("should correctly compute the hyperbolic cosecant for a complex number", () => {
    const z = new Complex(1, 1);
    const result = z.csch();
    const denominator = Math.cos(2 * 1) - Math.cosh(2 * 1);
    const expectedRe = 2 * Math.cosh(1) * Math.sin(1) / denominator;
    const expectedIm = -2 * Math.sinh(1) * Math.cos(1) / denominator;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});