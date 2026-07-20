import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot mutation detection', () => {
  it('should correctly compute abs for large complex numbers where re < im', () => {
    // When a=3001 (re) and b=6000 (im), both > 3000
    // Original: a < b => swap, compute correctly
    // Mutated: a >= b => don't swap, compute differently
    const c = new Complex(3001, 6000);
    const result = c.abs();
    const expected = Math.sqrt(3001 * 3001 + 6000 * 6000);
    expect(result).toBeCloseTo(expected, 10);
  });
});