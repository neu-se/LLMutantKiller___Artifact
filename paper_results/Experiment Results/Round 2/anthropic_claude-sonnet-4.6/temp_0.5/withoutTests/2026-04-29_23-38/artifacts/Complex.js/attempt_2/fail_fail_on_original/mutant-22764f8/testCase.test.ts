import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec function", () => {
  it("should correctly calculate asec for a complex number with non-zero imaginary part", () => {
    // asec(1 + i) - uses both re and im parts, so mutation of re to undefined will produce NaN
    const c = new Complex(1, 1);
    const result = c.asec();
    
    // With correct code, asec(1+i) should produce a finite, non-NaN result
    expect(result.isNaN()).toBe(false);
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    // Verify actual values are reasonable
    expect(result.re).toBeCloseTo(0.9045568943023814, 5);
  });
});