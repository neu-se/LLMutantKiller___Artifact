import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("acsch with subnormal inputs produces specific result on original", () => {
    const v = Number.MIN_VALUE;
    const c = new Complex(v, -v);
    const result = c.acsch();
    
    // Compute what the original should give
    // If d=0 (else branch): new Complex(0, Infinity).asinh()
    // If d!=0 (normal branch): new Complex(v/d, v/d).asinh()
    
    // The mutation changes the imaginary part from Infinity to 0 in the else branch
    // So if else branch: original gives Complex(Infinity, pi/2), mutated gives Complex(0, 0)
    
    // Test: result should equal new Complex(0, Infinity).asinh() on original
    // but new Complex(0, 0).asinh() on mutated
    
    const fromOriginalElse = new Complex(0, Infinity).asinh();
    const fromMutatedElse = new Complex(0, 0).asinh();
    
    // These must be different for the test to work
    if (fromOriginalElse.re === fromMutatedElse.re) {
      // If they're the same, we can't distinguish - try a different approach
      expect(true).toBe(false); // Force failure to see what's happening
    }
    
    expect(result.re).toBe(fromOriginalElse.re);
  });
});