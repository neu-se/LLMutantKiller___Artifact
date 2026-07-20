import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.01", () => {
    const c = new Complex(0.01, 0);
    const result = c.expm1();
    // Calculate expected value using the exact formula
    const expectedReal = Math.expm1(0.01) * Math.cos(0) + (Math.cos(0.01) - 1);
    // The mutation changes the Taylor series coefficient from division to multiplication
    // This should cause a noticeable difference at x=0.01
    expect(result.re).toBeCloseTo(expectedReal, 12);
  });
});