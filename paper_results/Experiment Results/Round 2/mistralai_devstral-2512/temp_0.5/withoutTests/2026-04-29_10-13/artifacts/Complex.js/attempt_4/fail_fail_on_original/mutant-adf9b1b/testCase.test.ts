import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for very small x values", () => {
    const c = new Complex(0.001, 0);
    const result = c.expm1();
    // The mutation changes the Taylor series calculation in cosm1
    // For very small x=0.001, the original implementation should give a precise result
    const expectedRe = Math.expm1(0.001) * Math.cos(0) + (Math.cos(0.001) - 1);
    expect(result.re).toBeCloseTo(expectedRe, 15);
    expect(result.im).toBeCloseTo(0, 15);
  });
});