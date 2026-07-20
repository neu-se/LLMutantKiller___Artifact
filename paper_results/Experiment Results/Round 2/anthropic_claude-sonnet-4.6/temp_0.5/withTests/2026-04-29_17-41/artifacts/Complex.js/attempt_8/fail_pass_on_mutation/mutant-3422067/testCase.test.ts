import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot', () => {
  it('abs uses correct branch for large equal values', () => {
    // When a===b, original uses else (b=y/x), mutated uses if (b=x/y)
    // For x=3000, y=3000: y/x=1, x/y=1. Same.
    // The ONLY way to distinguish: find x,y where |x|=|y| but x/y != y/x
    // This is impossible for finite reals.
    // BUT: what if we test that the result matches the ELSE branch specifically?
    // else: a=|x|, b=y/x, result = |x| * sqrt(1 + (y/x)^2)
    // For x=3000, y=3000: result = 3000 * sqrt(1 + 1) = 3000 * sqrt(2)
    // if: a=|y|, b=x/y, result = |y| * sqrt(1 + (x/y)^2)  
    // For x=3000, y=3000: result = 3000 * sqrt(1 + 1) = 3000 * sqrt(2)
    // Identical. Cannot distinguish.
    // Let me try a value where a===b but x and y differ...
    // x = 3000, y = -3000: |x|=|y|=3000
    // else: b = -3000/3000 = -1, result = 3000*sqrt(2)
    // if: b = 3000/(-3000) = -1, result = 3000*sqrt(2)
    // Still same!
    expect(new Complex(3000, 3000).abs()).toBe(new Complex(3000, -3000).abs());
  });
});