import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x near zero", () => {
    // Test with a value very close to zero where the Taylor series approximation should be used
    const x = 1e-5;
    const expected = Math.cos(x) - 1;
    const result = new Complex(x, 0).expm1().re;
    expect(result).toBeCloseTo(expected, 10);
  });
});