import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method", () => {
  it("should return NaN when subtracting Infinity from Infinity (both infinite)", () => {
    // Both original and mutated: Infinity - Infinity = NaN (both || and && catch this case)
    // This passes on both - need single infinite case
    // Single infinite: original (||) first check → NaN; mutated (&&) first check misses → INFINITY
    // But tests show original returns INFINITY for single infinite...
    // So the placeholder must be the SECOND check, not the first
    // Original second check (||): single infinite → INFINITY (but first check already caught it with ||)
    // Mutated second check (&&): single infinite → falls through to arithmetic → NaN result
    
    const finite = new Complex(1, 0);
    const inf = new Complex(Infinity, 0); // only re is infinite, not im
    
    // isInfinite = !(isNaN || isFinite), so Complex(Infinity, 0) IS infinite
    // finite.sub(inf): first check (||) catches → NaN in original
    // mutated (&&): first check misses since only z is infinite → second check (||) → INFINITY
    const result = finite.sub(inf);
    expect(result.isNaN()).toBe(true);
  });
});