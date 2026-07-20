import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.0001", () => {
    const c = new Complex(0.0001, 0);
    const result = c.expm1();
    // For x=0.0001, the Taylor series should be used
    // The mutation changes 1/87178291200 to 1*87178291200 which is a huge difference
    // This should cause a significant error in the result
    const expectedReal = Math.expm1(0.0001) * Math.cos(0) + (Math.cos(0.0001) - 1);
    expect(result.re).toBeCloseTo(expectedReal, 8);
  });
});