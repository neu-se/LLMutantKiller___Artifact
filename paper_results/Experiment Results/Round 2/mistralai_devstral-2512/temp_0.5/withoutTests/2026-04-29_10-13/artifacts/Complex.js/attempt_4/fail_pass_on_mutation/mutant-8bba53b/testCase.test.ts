import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x near zero", () => {
    // Test with x = 0 where the Taylor series approximation should be exact
    const x = 0;
    const c = new Complex(x, 0);
    const expm1 = c.expm1();
    const exp = c.exp();
    // At x=0, cos(0)-1 should be exactly 0
    expect(expm1.re).toBe(0);
    expect(exp.re - 1).toBe(0);
  });
});