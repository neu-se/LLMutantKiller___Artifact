import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should correctly compute asech of a complex number with non-zero imaginary part", () => {
    // Use a complex number with non-zero imaginary part
    // With the mutation, b = this[""] = undefined, so b*b = NaN, d = NaN
    // Then d !== 0 is false (NaN !== 0 is true actually... let me reconsider)
    // NaN !== 0 is TRUE, so it still takes the first branch
    // But b is undefined, so -b/d = NaN, causing acosh to receive wrong input
    const c = new Complex(1, 2);
    const result = c.asech();
    
    // Expected: asech(1+2i) computed correctly
    // d = 1 + 4 = 5, so we compute acosh(1/5 - 2i/5) = acosh(0.2 - 0.4i)
    // The real part should be a specific finite value
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    
    // Verify against known value: asech(1+2i)
    // re ≈ 0.39656823011232897, im ≈ -1.3715351777816576
    expect(result.re).toBeCloseTo(0.39656823011232897, 5);
    expect(result.im).toBeCloseTo(-1.3715351777816576, 5);
  });
});