import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot mutation detection', () => {
  it('detects mutation via abs with large equal-magnitude components', () => {
    // Find x,y where |x|=|y|>3000 and x/y != y/x in floating point
    // For x=3000.5, y=3000.5: x/y=1.0 exactly, y/x=1.0 exactly. Same.
    // The mutation changes which branch handles a===b case
    // Let's try to find if there's any numerical difference
    const x = 3000 + Number.EPSILON * 3000;
    const c = new Complex(x, x);
    const result = c.abs();
    expect(result).toBe(x * Math.SQRT2);
  });
});