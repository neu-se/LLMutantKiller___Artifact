import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation test', () => {
  it('should compute asec of a purely imaginary number correctly, not returning (0, Infinity)', () => {
    // For asec(0 + 1i), the original code should NOT return Complex(0, Infinity)
    // because b !== 0. The mutated code incorrectly returns Complex(0, Infinity)
    // whenever a === 0, regardless of b.
    const c = new Complex(0, 1);
    const result = c.asec();
    
    // The result should NOT be (0, Infinity) for asec(i)
    // asec(i) = acos(1/i) = acos(-i)
    // The imaginary part should be finite for this input
    expect(result.im).not.toBe(Infinity);
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});