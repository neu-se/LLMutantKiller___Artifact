import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc method", () => {
  it("should return correct imaginary part when acsc is called with a value where d is non-zero but b is non-zero", () => {
    // The mutation changes (b !== 0) to (b === 0) in the fallback branch
    // We need to reach d === 0 branch - but that requires a=0, b=0 which is caught early
    // However, if we pass NaN, the early return won't trigger (NaN !== 0)
    // and d = NaN*NaN + NaN*NaN = NaN, so d !== 0 is false (NaN !== 0 is true actually)
    // NaN !== 0 is true, so it takes the d !== 0 branch
    
    // Let's try with Infinity: a=Inf, b=0 -> d=Inf, takes d!==0 branch
    // What about a=0, b=Inf? d=Inf, takes d!==0 branch
    
    // The only way to reach d===0 branch with b!==0 seems impossible mathematically
    // But what if we construct a Complex directly with re=0, im=0 and bypass early return?
    // We can't - the check is explicit.
    
    // Let me try: what if a and b are such that a*a + b*b underflows to 0?
    // Very small numbers: a = 5e-200, b = 5e-200 -> d = 5e-399 which is 0 in float64
    const tiny = 5e-200;
    const z = new Complex(tiny, tiny);
    const result = z.acsc();
    
    // In original: b !== 0 is true, so im part = -b/0 = -Infinity -> asin gets Infinity im
    // In mutated: b === 0 is false (b=tiny), so im part = 0 -> asin gets 0 im
    // These should produce different results
    expect(isFinite(result.re) || !isNaN(result.re)).toBe(true);
    // The key difference: original produces a result with infinite imaginary input to asin
    // mutated produces asin(tiny, 0) which is a real number
    const originalLikeResult = new Complex(tiny !== 0 ? tiny / 0 : 0, tiny !== 0 ? -tiny / 0 : 0).asin();
    const mutatedLikeResult = new Complex(tiny !== 0 ? tiny / 0 : 0, 0).asin();
    
    // They differ, so result should match original
    expect(result.re).toBeCloseTo(originalLikeResult.re, 5);
  });
});