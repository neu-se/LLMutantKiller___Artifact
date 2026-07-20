import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex null handling", () => {
  it("should produce correct results when null-constructed complex is used in pow", () => {
    // 0^2 should be 0
    const c = new Complex(null);
    const result = c.pow(2);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    // If re or im were NaN or undefined, pow would return different results
    expect(result.isZero()).toBe(true);
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});