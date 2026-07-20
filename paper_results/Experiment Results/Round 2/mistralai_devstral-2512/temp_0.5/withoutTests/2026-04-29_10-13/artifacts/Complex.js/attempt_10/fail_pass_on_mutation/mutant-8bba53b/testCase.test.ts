import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.01", () => {
    // Test with a small value where the Taylor series approximation is used
    const x = 0.01;
    const c = new Complex(0, x);
    const expm1 = c.expm1();
    // For x=0.01, cos(x)-1 should be approximately -0.00005
    const expected = Math.cos(x) - 1;
    expect(expm1.re).toBeCloseTo(expected, 10);
  });
});