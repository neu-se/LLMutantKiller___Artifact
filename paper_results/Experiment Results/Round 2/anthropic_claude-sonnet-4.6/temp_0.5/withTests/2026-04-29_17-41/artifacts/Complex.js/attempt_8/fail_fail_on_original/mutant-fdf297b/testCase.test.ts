import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method", () => {
  it("should return INFINITY not NaN when subtracting finite from number with only re infinite", () => {
    // The placeholder is the second check (returning INFINITY)
    // Original (||): any infinite operand → INFINITY
    // Mutated (&&): only both infinite → INFINITY; single infinite falls to arithmetic
    // Need arithmetic result that differs from INFINITY
    // (Infinity, 0) - (Infinity, 0): arithmetic gives (NaN, 0) = NaN
    // But first check catches both-infinite → NaN in both versions
    
    // Single infinite case where arithmetic gives non-infinite:
    // (Infinity, 1) is infinite. (Infinity, 1).sub(Infinity, 0):
    // Both infinite → first check (NaN) catches both → NaN in both. No difference.
    
    // Only one infinite: (Infinity, 0).sub(0, 0)
    // Original second(||): INFINITY. Mutated second(&&): arithmetic (Infinity-0, 0-0)=(Infinity,0)=infinite
    // Both infinite - no difference.
    
    // Need: single infinite where arithmetic gives finite result - impossible with real infinity
    // Unless: (Infinity, 0).sub(Infinity, 1): first check catches both infinite → NaN both versions
    
    // The only detectable difference: when mutated falls through and arithmetic gives NaN
    // (Infinity, 0) - (Infinity, 0): arithmetic = (NaN, 0) = NaN
    // Original: first check (&&?) → NaN; second check (||) → INFINITY (if first misses)
    // If first check is &&: both infinite → NaN (same). If first check is ||: any infinite → NaN
    
    const a = new Complex(Infinity, 0);
    const b = new Complex(0, Infinity);
    // a is infinite, b is infinite - both infinite
    // If placeholder is second check with ||→&&:
    // First check (NaN, using &&): both infinite → NaN ✓ same in both
    const result = a.sub(b);
    expect(result.isInfinite()).toBe(true);
  });
});