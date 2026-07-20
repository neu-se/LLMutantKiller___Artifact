import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant for a complex number with b=1", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    // The mutation changes 2*cosh(a)*Math.cos(b)/d to 2*cosh(a)/Math.cos(b)/d
    // At b=1, cos(b)≈0.5403, so the mutation will produce different results
    const d = Math.cos(2) - Math.cosh(2);
    const expectedRe = 2 * Math.cosh(1) * Math.cos(1) / d;
    const expectedIm = -2 * Math.sinh(1) * Math.sin(1) / d;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});