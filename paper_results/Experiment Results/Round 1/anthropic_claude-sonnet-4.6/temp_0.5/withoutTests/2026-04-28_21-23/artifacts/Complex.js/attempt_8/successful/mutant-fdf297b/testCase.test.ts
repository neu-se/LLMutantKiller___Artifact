import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return Infinity when subtracting finite from partially-infinite complex", () => {
    // Complex(Infinity, 0) is infinite (isInfinite = true)
    // Complex(1, 0) is finite (isInfinite = false)
    // Original: first && → false, second || → Infinity
    // Mutated: first && → false, second && → false, falls through
    //   → new Complex(Infinity-1, 0-0) = new Complex(Infinity, 0) → isInfinite = true
    // Both give Infinity... need different approach
    // Try: Complex(Infinity, 0) - Complex(Infinity, 0):
    // Original: first && → both infinite → NaN
    // Mutated: first && → both infinite → NaN  (same)
    // Try: Complex(Infinity, 0) - Complex(0, Infinity):
    // Original: first && → both infinite → NaN
    // Mutated: first && → both infinite → NaN (same)
    // What about chaining? sub result feeds into something?
    // In mutated: Complex(Infinity,0).sub(Complex(1,0)) falls through → Complex(Infinity,0)
    // But that's same as Infinity anyway
    // The ONLY difference: when exactly one is infinite AND falling through gives non-Infinity
    // Complex(Infinity, 0) - Complex(Infinity, 1): both infinite
    //   Original: first && → NaN
    //   Mutated: first && → NaN (same, both infinite)
    // Hmm. What if we subtract Complex(Infinity,0) from Complex(0,0)?
    // finite - Infinity: original first && → false (this not infinite), second || → Infinity
    // mutated: first && → false, second && → false, falls through
    //   → new Complex(0-Infinity, 0-0) = new Complex(-Infinity, 0) → isInfinite = true
    // Still Infinity...
    // The mutation truly seems unobservable for Infinity results
    // But what about NaN results from falling through?
    // Complex(Infinity,0) - Complex(Infinity,0): 
    //   mutated: first && → both infinite → NaN (caught)
    // Need ONE infinite, ONE finite, where subtraction gives NaN
    // That's impossible with real arithmetic
    // WAIT: what if isInfinite check on second check matters for NaN propagation?
    // Let me try: does mutated code change NaN behavior?
    // Complex(NaN, NaN) is NaN, not infinite. So isInfinite = false for NaN.
    // NaN.sub(Infinity): original first && → this not infinite (NaN), z infinite → false
    //   second || → z infinite → Infinity
    // mutated: first && → false, second && → false, falls through
    //   → new Complex(NaN-Infinity, NaN-Infinity) = new Complex(NaN, NaN) → isNaN!
    const nanComplex = Complex.NAN;
    const result = nanComplex.sub(Complex.INFINITY);
    expect(result.isInfinite()).toBe(true);
  });
});