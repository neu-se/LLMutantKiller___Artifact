import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for very small x values", () => {
    // Test with a very small value where the Taylor series approximation should be used
    const x = 0.001;
    const expected = Math.cos(x) - 1;
    const result = new Complex(x, 0).expm1().re;
    expect(result).toBeCloseTo(expected, 10);
  });
});