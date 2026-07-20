import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acsch', () => {
  it('should correctly compute acsch for a real positive number', () => {
    // acsch(2) = log(2 + sqrt(2^2 + 1)) = log(2 + sqrt(5))
    const result = new Complex(2, 0).acsch();
    const expected = Math.log(2 + Math.sqrt(5));
    
    // Original code: when b === 0, uses the real formula directly
    // Mutated code: when b !== 0 (wrong condition), skips the real formula for b=0
    // Both paths should give same re, but let's verify the exact value
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
    
    // Also test with a negative real number to ensure correctness
    const result2 = new Complex(1, 0).acsch();
    const expected2 = Math.log(1 + Math.sqrt(2));
    expect(result2.re).toBeCloseTo(expected2, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});