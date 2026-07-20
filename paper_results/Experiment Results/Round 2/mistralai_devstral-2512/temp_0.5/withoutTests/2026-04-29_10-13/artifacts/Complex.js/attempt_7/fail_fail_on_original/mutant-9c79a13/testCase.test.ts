import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant for a complex number with b=π/6", () => {
    const c = new Complex(0.5, Math.PI/6);
    const result = c.sech();
    // The mutation changes 2*cosh(a)*Math.cos(b)/d to 2*cosh(a)/Math.cos(b)/d
    // At b=π/6, cos(b)=√3/2≈0.8660, so the mutation will produce different results
    const d = Math.cos(Math.PI/3) - Math.cosh(1);
    const expectedRe = 2 * Math.cosh(0.5) * Math.cos(Math.PI/6) / d;
    const expectedIm = -2 * Math.sinh(0.5) * Math.sin(Math.PI/6) / d;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});