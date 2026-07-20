import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosh function behavior', () => {
  it('should correctly compute cos of a complex number with small imaginary part', () => {
    // cos(0 + epsilon*i) = cos(0)*cosh(epsilon) + i*(-sin(0)*sinh(epsilon))
    // Real part = cosh(epsilon) which should be very close to 1 for small epsilon
    // With the mutation (&&), cosh becomes the custom function which returns 1 - x for small x
    // So for epsilon = 1e-7, original gives ~1.000000000000005, mutated gives ~0.9999999
    
    const epsilon = 1e-7;
    const c = new Complex(0, epsilon);
    const result = c.cos();
    
    // Math.cosh(1e-7) ≈ 1.000000000000005
    // custom function with mutation: 1 - 1e-7 = 0.9999999
    // The real part should be close to Math.cosh(epsilon)
    const expected = Math.cosh(epsilon);
    
    expect(result.re).toBeCloseTo(expected, 10);
  });
});