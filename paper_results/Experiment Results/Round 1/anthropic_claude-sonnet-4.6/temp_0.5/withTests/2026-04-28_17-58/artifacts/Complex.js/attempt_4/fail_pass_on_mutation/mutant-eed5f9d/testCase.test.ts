import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with tiny values where d underflows to 0 produces correct result based on original fallback logic", () => {
    const tiny = Number.MIN_VALUE;
    // Verify d underflows to 0
    expect(tiny * tiny + tiny * tiny).toBe(0);
    
    const c = new Complex(tiny, tiny);
    const result = c.acsch();
    
    // Original fallback: new Complex(Infinity, -Infinity).asinh()
    // Mutant fallback:   new Complex(0, -Infinity).asinh()
    // Compute expected from original path directly:
    const expected = new Complex(Infinity, -Infinity).asinh();
    
    // These should match original but not mutant
    if (isNaN(expected.re)) {
      expect(result.isNaN()).toBe(true);
    } else {
      expect(result.re).toBe(expected.re);
      expect(result.im).toBe(expected.im);
    }
    
    // Verify mutant path gives different result
    const mutantExpected = new Complex(0, -Infinity).asinh();
    // The two paths must differ for this test to be meaningful
    const originalAndMutantDiffer = 
      expected.re !== mutantExpected.re || 
      expected.im !== mutantExpected.im ||
      (isNaN(expected.re) !== isNaN(mutantExpected.re));
    expect(originalAndMutantDiffer).toBe(true);
  });
});