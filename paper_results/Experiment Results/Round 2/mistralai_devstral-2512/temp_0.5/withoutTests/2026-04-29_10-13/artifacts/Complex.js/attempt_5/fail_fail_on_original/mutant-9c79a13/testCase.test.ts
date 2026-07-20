import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech()", () => {
  it("should correctly compute the hyperbolic secant for a complex number with b=π/3", () => {
    const c = new Complex(0.5, Math.PI/3);
    const result = c.sech();
    // The mutation changes the formula from 2*cosh(a)*Math.cos(b)/d to 2*cosh(a)/Math.cos(b)/d
    // This test uses b=π/3 where cos(b)=0.5 to expose the difference
    expect(result.re).toBeCloseTo(0.6, 1);
    expect(result.im).toBeCloseTo(-0.3, 1);
  });
});