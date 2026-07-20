import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should return a finite non-NaN result for sech(1 + i)", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    
    // With the mutation, b = this[""] = undefined, so Math.cos(2 * undefined) = NaN
    // and the denominator d = NaN, making both re and im NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});