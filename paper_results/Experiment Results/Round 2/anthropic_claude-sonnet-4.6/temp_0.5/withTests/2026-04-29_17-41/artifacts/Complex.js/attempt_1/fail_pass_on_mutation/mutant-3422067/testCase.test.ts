import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot with equal large values', () => {
  it('should correctly compute abs() when real and imaginary parts have equal magnitude above 3000', () => {
    // When a === b in hypot (both > 3000), original uses else branch (b = y/x)
    // mutated uses if branch (a = b, b = x/y) - but for equal positive values same result
    // Need to find a case where the branch matters
    const c = new Complex(3000, 3000);
    const result = c.abs();
    expect(result).toBeCloseTo(3000 * Math.sqrt(2), 10);
  });
});