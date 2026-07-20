import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.0001 in Taylor series range", () => {
    const x = 0.0001;
    const c = new Complex(0, x);
    const expm1 = c.expm1();
    // For pure imaginary input (0 + xi), expm1.re should equal cosm1(x)
    // The mutation changes the sign in the Taylor series approximation
    const expected = Math.cos(x) - 1;
    expect(expm1.re).toBeCloseTo(expected, 15);
  });
});