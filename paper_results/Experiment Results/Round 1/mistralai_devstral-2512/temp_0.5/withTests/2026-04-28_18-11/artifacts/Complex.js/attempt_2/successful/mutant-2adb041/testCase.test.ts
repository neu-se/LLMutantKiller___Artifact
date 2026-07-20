import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test a small value where the Taylor series approximation should be used
    const x = 0.1;
    const c = new Complex(0, x);
    const expm1Result = c.expm1();
    // The mutation changes the Taylor series coefficients in cosm1
    // This should affect the real part of expm1 for purely imaginary inputs
    const expectedRe = Math.expm1(0) * Math.cos(x) + (Math.cos(x) - 1.0);
    expect(expm1Result.re).toBeCloseTo(expectedRe, 10);
    expect(expm1Result.im).toBeCloseTo(Math.sin(x), 10);
  });
});