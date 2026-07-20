import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('abs with large equal values matches Math.hypot', () => {
    // hypot(3000, 3000): slow path, a===b
    // Original: 3000 * sqrt(1 + (3000/3000)^2) = 3000 * sqrt(2)
    // Mutant: 3000 * sqrt(1 + (3000/3000)^2) = 3000 * sqrt(2)
    // Math.hypot(3000, 3000) = 3000 * sqrt(2)
    // All the same...
    
    // What about hypot(2999, 3000) vs hypot(3000, 2999)?
    // hypot(2999, 3000): fast path -> sqrt(2999^2 + 3000^2)
    // hypot(3000, 2999): slow path, a>b, else -> 3000*sqrt(1+(2999/3000)^2)
    // These might differ in floating point!
    
    expect(new Complex(2999, 3000).abs()).toBe(new Complex(3000, 2999).abs());
  });
});