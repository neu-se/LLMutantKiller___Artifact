import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech function", () => {
  it("should correctly compute asech of a complex number with non-zero imaginary part", () => {
    // asech(1 + i) should return a valid complex number
    // In the mutated code, var b = this[""] gives undefined instead of this['im']
    // causing d = a*a + b*b = NaN, and the result becomes NaN
    const c = new Complex(1, 1);
    const result = c.asech();
    
    // The result should be a valid (non-NaN) complex number
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    
    // Verify the actual computed values match expected
    // asech(1+i) = acosh(1/(1+i)) = acosh((1-i)/2)
    // Expected values computed from the correct formula
    const expected = new Complex(0.5, 1).inverse().acosh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});