import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot mutation detection', () => {
  it('should correctly compute abs when real part is larger than imaginary part for large values', () => {
    // a=6000 (re), b=3001 (im), both > 3000, and a > b
    // Original: a < b is FALSE, so b = y/x = 3001/6000, result = 6000 * sqrt(1 + (3001/6000)^2) -- correct
    // Mutated: a >= b is TRUE, so a = b = 3001, b = x/y = 6000/3001, result = 3001 * sqrt(1 + (6000/3001)^2) -- same mathematically
    const c = new Complex(6000, 3001);
    const result = c.abs();
    const expected = Math.sqrt(6000 * 6000 + 3001 * 3001);
    expect(result).toBeCloseTo(expected, 5);
  });
});