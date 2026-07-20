import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech with zero denominator and non-zero real part", () => {
  it("should return Infinity real part when a is non-zero and d is zero via NaN-free path", () => {
    // The mutation changes (a !== 0) ? a / 0 : 0 to (false) ? a / 0 : 0
    // We need d = a*a + b*b === 0 but a !== 0
    // This can happen with subnormal arithmetic edge cases
    // Try: construct a complex where isZero() is false but d rounds to 0
    // Use very small numbers where a*a underflows to 0
    const tiny = 5e-324; // smallest positive double (denormalized)
    const c = new Complex(tiny, 0);
    const result = c.asech();
    // Original: a/d branch with a=tiny, d=tiny*tiny=0 → else branch → a!==0 → Infinity
    // Mutated: else branch → false → 0
    expect(result.re).toBe(Infinity);
  });
});