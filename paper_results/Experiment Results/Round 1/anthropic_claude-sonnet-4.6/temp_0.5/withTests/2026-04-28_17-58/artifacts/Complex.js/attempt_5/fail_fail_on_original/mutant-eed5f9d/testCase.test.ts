import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch fallback when d=0 with nonzero a should differ between original and mutant", () => {
    // Use a=MIN_VALUE, b=-MIN_VALUE so b!==0 and d=a^2+b^2 underflows to 0
    // Original: Complex((a!==0)?a/0:0, (b!==0)?-b/0:0) = Complex(Infinity, Infinity).asinh()
    // Mutant:   Complex((false)?a/0:0,  (b!==0)?-b/0:0) = Complex(0, Infinity).asinh()
    const tiny = Number.MIN_VALUE;
    const c = new Complex(tiny, -tiny);
    expect(tiny * tiny + tiny * tiny).toBe(0); // confirm d underflows
    
    const original = new Complex(Infinity, Infinity).asinh();
    const mutant = new Complex(0, Infinity).asinh();
    
    const result = c.acsch();
    
    // Check that result matches original, not mutant
    // original.re should differ from mutant.re
    expect(isNaN(result.re)).toBe(isNaN(original.re));
    expect(isNaN(result.im)).toBe(isNaN(original.im));
    if (!isNaN(original.re) && !isNaN(mutant.re)) {
      expect(result.re).toBeCloseTo(original.re, 10);
    }
    // Key assertion: result should NOT equal mutant result
    const matchesMutant = (isNaN(result.re) === isNaN(mutant.re)) && 
                          (isNaN(result.im) === isNaN(mutant.im)) &&
                          (!isNaN(result.re) ? result.re === mutant.re : true) &&
                          (!isNaN(result.im) ? result.im === mutant.im : true);
    expect(matchesMutant).toBe(false);
  });
});