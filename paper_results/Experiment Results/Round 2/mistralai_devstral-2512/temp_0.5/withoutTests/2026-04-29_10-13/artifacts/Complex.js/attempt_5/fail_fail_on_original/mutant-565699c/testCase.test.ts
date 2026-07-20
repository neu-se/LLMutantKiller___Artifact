import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.js cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for x within Taylor series range", () => {
    // Test with a value within the Taylor series range (-π/4 ≤ x ≤ π/4)
    const x = 0.5;
    const expected = Math.cos(x) - 1;
    const result = new Complex(x, 0).expm1().re;
    expect(result).toBeCloseTo(expected, 10);
  });
});