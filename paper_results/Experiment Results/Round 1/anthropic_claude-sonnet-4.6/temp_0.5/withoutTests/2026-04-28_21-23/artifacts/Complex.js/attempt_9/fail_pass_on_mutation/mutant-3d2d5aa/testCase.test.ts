import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('detects mutation by checking 5e-324 squared is actually 0', () => {
    const tiny = 5e-324;
    const sq = tiny * tiny;
    // If this is 0, the fallback IS reached
    // If not 0, we need another approach
    
    if (sq === 0) {
      const result = new Complex(tiny, 0).acoth();
      // Original gives NaN (atanh(Inf,0)), mutant gives 0 (atanh(0,0))
      // One of these must differ - check both
      const isNaNResult = isNaN(result.re);
      const isZeroResult = result.re === 0;
      // In original: NaN (not 0), in mutant: 0 (not NaN)
      expect(isNaNResult || (!isNaNResult && !isZeroResult)).toBe(true);
    } else {
      // Fallback not reachable with subnormals in this environment
      // Try a different approach: use NaN arithmetic
      // Actually check: is there any finite nonzero a where a*a === 0?
      expect(sq).toBe(0); // Force failure to see actual value
    }
  });
});