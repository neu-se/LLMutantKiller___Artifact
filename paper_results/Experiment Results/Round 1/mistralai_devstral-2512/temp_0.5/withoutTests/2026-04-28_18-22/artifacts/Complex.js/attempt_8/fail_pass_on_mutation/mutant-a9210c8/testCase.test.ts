import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should produce correct sech result for complex number with non-zero imaginary part", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sech();
    // The mutation changes this['im'] to this[""] which will be undefined
    // This will cause the calculation to produce NaN results
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    // Also verify the result is not Infinity
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});