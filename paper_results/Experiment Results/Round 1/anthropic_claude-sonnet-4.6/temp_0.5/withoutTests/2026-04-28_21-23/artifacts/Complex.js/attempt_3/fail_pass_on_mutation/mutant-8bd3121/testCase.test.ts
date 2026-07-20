import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech function", () => {
  it("should correctly compute asech of a complex number with non-zero imaginary part and return correct imaginary component", () => {
    // asech(0 + 1i): with correct b=1, d = 0+1=1, result is acosh(0 - 1i)
    // With mutated b=undefined, computation differs significantly
    const c = new Complex(0, 1);
    const result = c.asech();
    
    // Manually: asech(i) = acosh(1/i) = acosh(-i)
    // The imaginary part should be a specific non-zero finite value
    // Expected: re ≈ 0.8813735870195430, im ≈ -1.5707963267948966 (approximately)
    expect(result.re).toBeCloseTo(0.8813735870195430, 5);
    expect(result.im).toBeCloseTo(-1.5707963267948966, 5);
  });
});