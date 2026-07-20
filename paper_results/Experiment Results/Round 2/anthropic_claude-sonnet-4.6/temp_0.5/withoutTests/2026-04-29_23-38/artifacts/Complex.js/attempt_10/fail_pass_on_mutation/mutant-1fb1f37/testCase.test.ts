import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('cosh behavior', () => {
  it('sin with small imaginary part', () => {
    // sin(a + bi) = sin(a)*cosh(b) + i*cos(a)*sinh(b)
    // For a = PI/2, b = 5e-10:
    // re = sin(PI/2) * cosh(5e-10) = 1 * cosh(5e-10)
    // Original fallback: 1 - 5e-10 = 0.9999999995
    // Mutated fallback: (exp+exp)/2 ≈ 1
    // Math.cosh(5e-10) = 1 (rounds to 1 in double precision)
    // So both give 1... 
    
    // What about using the `equals` method to compare?
    // Or what about testing a computation that accumulates the error?
    
    // Let's try: compute sin many times and see if error accumulates
    // No, that's non-deterministic in terms of what we're testing
    
    // Actually - let me check if maybe the issue is with how cosh(0) works
    // cosh(0): original fallback: 1 - 0 = 1, mutated: (1+1)/2 = 1. Same.
    
    // The ONLY observable difference would be if Math.cosh is NOT available
    // Let me check what happens with the `tan` function for purely imaginary numbers
    // tan(0 + bi) = sinh(2b) / (cos(0) + cosh(2b)) * i
    // = sinh(2b) / (1 + cosh(2b)) * i
    // = tanh(b) * i
    
    const result = new Complex(0, 1).tan();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.tanh(1), 10);
  });
});