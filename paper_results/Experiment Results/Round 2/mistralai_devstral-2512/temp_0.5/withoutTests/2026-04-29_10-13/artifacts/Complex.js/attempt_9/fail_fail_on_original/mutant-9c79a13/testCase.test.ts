import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant for a complex number with b=0.5", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sech();
    // The mutation changes 2*cosh(a)*Math.cos(b)/d to 2*cosh(a)/Math.cos(b)/d
    // At b=0.5, cos(b)≈0.8776, so the mutation will produce different results
    const d = Math.cos(1) - Math.cosh(1);
    const expectedRe = 2 * Math.cosh(0.5) * Math.cos(0.5) / d;
    const expectedIm = -2 * Math.sinh(0.5) * Math.sin(0.5) / d;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});