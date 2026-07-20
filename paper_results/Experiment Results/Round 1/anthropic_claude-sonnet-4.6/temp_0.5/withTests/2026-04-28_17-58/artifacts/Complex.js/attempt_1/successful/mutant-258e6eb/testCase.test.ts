import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex atanh mutation detection', () => {
  it('should compute atanh of a complex number with non-zero imaginary part correctly', () => {
    // For input where noIM = false (a <= 1 or b !== 0),
    // the original code does NOT negate x['im'],
    // but the mutated code (if true) always negates x['im']
    
    // Use 0.5 + 0.5i: a=0.5, b=0.5 => noIM = (0.5 > 1 && 0.5 === 0) = false
    const c = new Complex(0.5, 0.5);
    const result = c.atanh();
    
    // The imaginary part should be positive (not negated) in the original
    // In the mutated version, it would be negated (negative)
    expect(result.im).toBeGreaterThan(0);
  });
});