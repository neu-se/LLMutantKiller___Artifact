import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant for a complex number with b=π/3", () => {
    const c = new Complex(0.5, Math.PI/3);
    const result = c.sech();
    // Calculate expected values using the correct formula
    const a = 0.5;
    const b = Math.PI/3;
    const d = Math.cos(2*b) - Math.cosh(2*a);
    const expectedRe = 2 * Math.cosh(a) * Math.cos(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});