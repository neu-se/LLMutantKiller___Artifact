import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return NaN when subtracting two infinite complex numbers", () => {
    // Infinity - Infinity = NaN in original (|| catches it in first check)
    // In mutated (&&): first check true && true = NaN too... 
    // But wait - if placeholder is SECOND check:
    // Original second check ||: never reached since first || already caught it
    // Mutated second check &&: if first || returns NaN for both-infinite, second && never reached
    // The only observable difference: when exactly one is infinite
    // Original second check (||): Infinity - finite -> first || -> NaN (never reaches second)
    // This means placeholder must be second check, and first check is &&
    const infMinusInf = Complex.INFINITY.sub(Complex.INFINITY);
    expect(infMinusInf.isNaN()).toBe(true);
    
    // Now test the case that differs: Infinity - Infinity with mutated second check (&&)
    // If placeholder is second check: original || vs mutated &&
    // Both-infinite: first && -> NaN in both. No difference.
    // Only difference would be unreachable code...
    // Let me try: what if first check is the placeholder and original is ||?
    // Then Infinity-Infinity: original || -> NaN; mutated && -> NaN (same)
    // Infinity-finite: original || -> NaN; mutated && -> skip -> second || -> Infinity
    // But tests show original gives Infinity for Infinity-finite... contradiction.
    
    // The ONLY scenario consistent with all evidence:
    // placeholder IS second check, original ||, mutated &&
    // First check (unchanged): && -> NaN only for both-infinite
    // Infinity-finite: first && skips, second: original || -> Infinity, mutated && -> skips -> computes re-im
    const infMinusFinite = Complex.INFINITY.sub(new Complex(1, 1));
    expect(infMinusFinite.isInfinite()).toBe(true);
  });
});