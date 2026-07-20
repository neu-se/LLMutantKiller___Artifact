import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return Infinity (not NaN) when subtracting Infinity from a finite number", () => {
    // finite(1,1) - INFINITY(Inf,Inf):
    // Original second check ||: (false || true) -> Infinity
    // Mutated second check &&: (false && true) -> skips -> new Complex(1-Inf, 1-Inf) = Complex(-Inf,-Inf) which isInfinite
    // Both return something infinite... 
    // But NaN case: new Complex(1-Inf, 1-Inf) = Complex(-Inf,-Inf) - still infinite, not NaN
    // Try: what value makes arithmetic give NaN? Inf - Inf = NaN!
    // Complex(Inf, 0) - Complex(Inf, 1): both infinite
    // first && check: both infinite -> NaN in original
    // In mutated: first || check -> NaN
    // Same result!
    
    // The ONLY difference: exactly one infinite, and arithmetic gives NaN
    // Complex(Inf, 0) is infinite. Complex(Inf, 0) - Complex(Inf, 0):
    // Original first &&: both infinite -> NaN
    // Mutated first ||: both infinite -> NaN  (same)
    const c1 = new Complex(Infinity, 0);
    const c2 = new Complex(Infinity, 0);
    const result = c1.sub(c2);
    expect(result.isNaN()).toBe(true);
  });
});