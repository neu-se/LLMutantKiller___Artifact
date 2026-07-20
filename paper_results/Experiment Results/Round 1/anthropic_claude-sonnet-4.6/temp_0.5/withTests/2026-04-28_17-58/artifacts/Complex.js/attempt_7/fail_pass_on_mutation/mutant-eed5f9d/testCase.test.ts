import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("verifies original and mutant fallback paths produce different results", () => {
    // Original fallback with a=MIN_VALUE, b=-MIN_VALUE:
    // re = (a!==0) ? a/0 : 0 = Infinity
    // im = (b!==0) ? -b/0 : 0 = -(-MIN_VALUE)/0 = Infinity
    // So: new Complex(Infinity, Infinity).asinh()
    
    // Mutant fallback:
    // re = (false) ? a/0 : 0 = 0
    // im = Infinity (same)
    // So: new Complex(0, Infinity).asinh()
    
    const originalFallback = new Complex(Infinity, Infinity).asinh();
    const mutantFallback = new Complex(0, Infinity).asinh();
    
    // Assert they differ - if this fails, mutation is undetectable
    const differ = originalFallback.re !== mutantFallback.re || 
                   originalFallback.im !== mutantFallback.im ||
                   isNaN(originalFallback.re) !== isNaN(mutantFallback.re) ||
                   isNaN(originalFallback.im) !== isNaN(mutantFallback.im);
    
    expect(differ).toBe(true);
    
    const tiny = Number.MIN_VALUE;
    const c = new Complex(tiny, -tiny);
    const result = c.acsch();
    
    // Result should match original fallback behavior
    expect(isNaN(result.re)).toBe(isNaN(originalFallback.re));
    expect(isNaN(result.im)).toBe(isNaN(originalFallback.im));
    if (!isNaN(originalFallback.re)) {
      expect(result.re).toBe(originalFallback.re);
    }
  });
});