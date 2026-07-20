import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('abs with values that trigger slow path where a equals b', () => {
    // The only difference between original and mutant is when a===b in slow path
    // Original: else branch, b = y/x
    // Mutant: if branch, a=b (same), b = x/y
    // When x=y: x/y = y/x = 1, same result
    // When x=-y: x/y = y/x = -1, same result
    // This mutation appears equivalent
    // Let me test with negative values to be thorough
    expect(new Complex(-4000, 4000).abs()).toBe(new Complex(4000, -4000).abs());
  });
});