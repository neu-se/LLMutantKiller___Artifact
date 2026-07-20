import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should return a finite non-NaN result for sech of a complex number with non-zero imaginary part", () => {
    // With the mutation, b = this[""] = undefined
    // Math.cos(2 * undefined) = NaN, making the result NaN
    // With original code, b = this['im'] = 1, giving a valid result
    const z = new Complex(1, 1);
    const result = z.sech();

    // The result should be a valid (non-NaN) complex number
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    // Also verify the real part has the expected sign/magnitude
    expect(result.re).toBeGreaterThan(0);
  });
});