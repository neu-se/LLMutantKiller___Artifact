import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch fallback branch: when a is nonzero and d is zero, re part of fallback input differs", () => {
    // Directly test the two possible fallback inputs
    // Original: Complex(Infinity, X).asinh() where X depends on b
    // Mutant:   Complex(0, X).asinh()
    // We need these to produce different results
    
    // Try with b > 0: -b/0 = -Infinity
    // Original: Complex(Infinity, -Infinity).asinh()
    // Mutant:   Complex(0, -Infinity).asinh()
    const orig1 = new Complex(Infinity, -Infinity).asinh();
    const mut1 = new Complex(0, -Infinity).asinh();
    
    // Try with b < 0: -b/0 = +Infinity  
    // Original: Complex(Infinity, Infinity).asinh()
    // Mutant:   Complex(0, Infinity).asinh()
    const orig2 = new Complex(Infinity, Infinity).asinh();
    const mut2 = new Complex(0, Infinity).asinh();

    // Check which pair differs and use that
    const pair1differs = orig1.re !== mut1.re || orig1.im !== mut1.im || 
                         isNaN(orig1.re) !== isNaN(mut1.re);
    const pair2differs = orig2.re !== mut2.re || orig2.im !== mut2.im ||
                         isNaN(orig2.re) !== isNaN(mut2.re);

    // At least one pair must differ for mutation to be detectable
    expect(pair1differs || pair2differs).toBe(true);
    
    const tiny = Number.MIN_VALUE;
    // Use whichever pair differs
    if (pair1differs) {
      const c = new Complex(tiny, tiny); // b > 0 -> -b/0 = -Infinity
      const result = c.acsch();
      expect(isNaN(result.re)).toBe(isNaN(orig1.re));
    } else {
      const c = new Complex(tiny, -tiny); // b < 0 -> -b/0 = +Infinity
      const result = c.acsch();
      expect(isNaN(result.re)).toBe(isNaN(orig2.re));
    }
  });
});