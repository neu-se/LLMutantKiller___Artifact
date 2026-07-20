import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x = 0.00001", () => {
    // Test with a very small value where the Taylor series approximation is used
    const x = 0.00001;
    const expected = Math.cos(x) - 1.0;
    const result = new Complex(0, x).expm1().re;
    expect(result).toBeCloseTo(expected, 15);
  });
});