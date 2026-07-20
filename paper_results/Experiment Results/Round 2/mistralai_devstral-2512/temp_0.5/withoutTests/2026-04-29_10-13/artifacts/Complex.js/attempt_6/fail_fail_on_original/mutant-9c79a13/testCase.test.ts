import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant for a complex number with b=π/4", () => {
    const c = new Complex(0.5, Math.PI/4);
    const result = c.sech();
    // The mutation changes 2*cosh(a)*Math.cos(b)/d to 2*cosh(a)/Math.cos(b)/d
    // At b=π/4, cos(b)=√2/2≈0.7071, so the mutation will produce different results
    const expectedRe = 2 * Math.cosh(0.5) * Math.cos(Math.PI/4) / (Math.cos(Math.PI/2) - Math.cosh(1));
    const expectedIm = -2 * Math.sinh(0.5) * Math.sin(Math.PI/4) / (Math.cos(Math.PI/2) - Math.cosh(1));
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});