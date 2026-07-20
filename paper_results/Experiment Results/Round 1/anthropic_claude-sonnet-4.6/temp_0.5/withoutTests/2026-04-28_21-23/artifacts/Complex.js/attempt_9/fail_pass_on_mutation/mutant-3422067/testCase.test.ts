import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex', () => {
  it('abs matches Math.hypot for values at slow path boundary', () => {
    // a=3000, b=3000: slow path (a < 3000 is false)
    // Both original and mutant give 3000 * Math.sqrt(2)
    // Math.hypot(3000, 3000) might give a different floating point result
    const result = new Complex(3000, 3000).abs();
    expect(result).toBe(Math.hypot(3000, 3000));
  });
});