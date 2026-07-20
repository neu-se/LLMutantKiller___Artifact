import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('should correctly compute acsch for a real non-zero number where mutation changes result from log to Infinity', () => {
    // acsch(2) = log(2 + sqrt(4 + 1)) = log(2 + sqrt(5))
    // Original: returns Complex(log(2 + sqrt(5)), 0) ≈ Complex(1.4436..., 0)
    // Mutated: returns Complex(Infinity, 0) because (false) replaces (a !== 0)
    const result = new Complex(2, 0).acsch();
    const expected = Math.log(2 + Math.sqrt(2 * 2 + 1));
    
    expect(isFinite(result.re)).toBe(true);
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});