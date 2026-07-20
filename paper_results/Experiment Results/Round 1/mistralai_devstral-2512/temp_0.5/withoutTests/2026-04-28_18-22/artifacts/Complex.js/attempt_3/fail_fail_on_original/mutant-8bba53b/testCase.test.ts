import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    // Test with a small value where the Taylor series approximation is used
    const x = 0.1;
    const expected = Math.cos(x) - 1.0;
    const result = new Complex(x, 0).expm1().re;
    expect(result).toBeCloseTo(expected, 6);
  });
});