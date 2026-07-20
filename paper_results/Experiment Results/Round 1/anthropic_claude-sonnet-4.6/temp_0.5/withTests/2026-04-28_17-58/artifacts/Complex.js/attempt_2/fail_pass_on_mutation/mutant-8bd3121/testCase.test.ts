import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech function", () => {
  it("should correctly compute asech of a real number 0.5", () => {
    // asech(0.5) should return a real number approximately 1.3169578969248166
    // In the mutated code, var b = this[""] gives undefined instead of this['im']
    // causing d = a*a + undefined*undefined = NaN, making the result NaN
    const c = new Complex(0.5, 0);
    const result = c.asech();
    
    // The result should be a valid real number (im close to 0)
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    
    // asech(0.5) = acosh(2) ≈ 1.3169578969248166
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});