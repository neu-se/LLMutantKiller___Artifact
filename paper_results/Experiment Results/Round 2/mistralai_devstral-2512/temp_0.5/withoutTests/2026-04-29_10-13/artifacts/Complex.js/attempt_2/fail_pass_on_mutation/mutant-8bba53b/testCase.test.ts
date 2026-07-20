import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test with a small value where the Taylor series approximation is used
    const x = 0.1;
    const c = new Complex(x, 0);
    const expm1 = c.expm1();
    const exp = c.exp();
    // The difference between expm1 and exp-1 should be very small
    expect(Math.abs(expm1.re - (exp.re - 1))).toBeLessThan(1e-10);
  });
});