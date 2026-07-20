import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // acsch(1 + i) should return a valid complex number
    // The mutation changes `d !== 0` to `d === 0`, which inverts the branch logic
    // For a complex number like 1+i, d = a*a + b*b = 1 + 1 = 2 (non-zero)
    // Original: d !== 0 is true, so use the formula with a/d, -b/d
    // Mutated: d === 0 is false, so use the fallback (which would give different results)
    
    const c = new Complex(1, 1);
    const result = c.acsch();
    
    // The expected value of acsch(1+i) computed via the correct formula
    // acsch(z) = asinh(1/z) where 1/z = (a-bi)/(a^2+b^2)
    // For z = 1+i: 1/z = (1-i)/2 = 0.5 - 0.5i
    // asinh(0.5 - 0.5i) ≈ 0.5306... - 0.4522...i
    
    // With the mutation, d = a*a + b*b = 2, d === 0 is false,
    // so it would take the else branch: new Complex((a !== 0) ? a/0 : 0, (b !== 0) ? -b/0 : 0).asinh()
    // which gives Complex(Infinity, -Infinity).asinh() - a very different result
    
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    
    // Verify the actual computed values are close to expected
    expect(result.re).toBeCloseTo(0.5306375309525178, 10);
    expect(result.im).toBeCloseTo(-0.45227844715119064, 10);
  });
});