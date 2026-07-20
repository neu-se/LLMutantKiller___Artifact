import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosh function via cos', () => {
  it('should use Math.cosh correctly for very small imaginary values', () => {
    // cos(0 + b*i) real part = cos(0) * cosh(b) = cosh(b)
    // For b = 5e-10 (< 1e-9), custom function returns 1 - 5e-10
    // Math.cosh(5e-10) returns 1 (essentially, difference is ~1.25e-19)
    // So real part with original: ~1, with mutation: ~0.9999999995
    const b = 5e-10;
    const c = new Complex(0, b);
    const result = c.cos();
    
    // With original code (Math.cosh): result.re ≈ 1.0000000000000001...
    // With mutated code (custom fn): result.re = 1 - 5e-10 = 0.9999999995
    expect(result.re).toBeGreaterThan(1 - 1e-15);
  });
});