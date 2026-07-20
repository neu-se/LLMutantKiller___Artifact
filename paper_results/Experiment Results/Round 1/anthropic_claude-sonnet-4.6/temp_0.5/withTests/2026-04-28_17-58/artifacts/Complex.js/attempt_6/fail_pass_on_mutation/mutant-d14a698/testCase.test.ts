import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation detection', () => {
  it('asec(z) should equal acos(1/z) for z = new Complex(0, Number.MIN_VALUE)', () => {
    // For z with a=0, b=MIN_VALUE: d=0, early return not triggered
    // asec computes acos of a constructed value
    // Original: -b/0 = -Infinity for im
    // Mutated:  +b/0 = +Infinity for im  
    // We compare asec result to acos(1/z) computed differently
    // 1/z = 1/(i*MIN_VALUE) = -i/MIN_VALUE = (0, -1/MIN_VALUE)
    // acos(0, -1/MIN_VALUE) where -1/MIN_VALUE = -Infinity
    const oneOverZ = new Complex(0, -1 / Number.MIN_VALUE); // (0, -Inf)
    const expected = oneOverZ.acos();
    
    const z = new Complex(0, Number.MIN_VALUE);
    const result = z.asec();
    
    // Both should give same result if original is correct
    // Check if re parts match (or both NaN)
    if (isNaN(expected.re)) {
      expect(isNaN(result.re)).toBe(true);
    } else {
      expect(result.re).toBeCloseTo(expected.re, 5);
    }
    if (isNaN(expected.im)) {
      expect(isNaN(result.im)).toBe(true);
    } else {
      expect(result.im).toBeCloseTo(expected.im, 5);
    }
  });
});