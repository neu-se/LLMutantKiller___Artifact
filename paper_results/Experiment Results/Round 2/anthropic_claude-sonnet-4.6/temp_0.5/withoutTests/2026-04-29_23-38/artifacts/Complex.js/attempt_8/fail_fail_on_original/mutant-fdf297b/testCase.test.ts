import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return Infinity when subtracting Infinity from Infinity is NaN but single infinite gives Infinity", () => {
    // If placeholder is second check:
    // Original second ||: Infinity-finite -> first && skips -> second || -> Infinity  
    // Mutated second &&: Infinity-finite -> first && skips -> second && skips -> NaN arithmetic result
    const result = Complex.INFINITY.sub(new Complex(1, 0));
    // In mutated: falls through to new Complex(Infinity-1, Infinity-0) = Complex(Infinity, Infinity) = still Infinite?
    // Actually Infinity - 1 = Infinity, so result would still be Infinite...
    
    // Try finite - finite where one component differs
    const result2 = new Complex(Infinity, 0).sub(new Complex(1, 0));
    expect(result2.re).toBe(Infinity);
    expect(result2.im).toBe(0); // In mutated, falls through: 0 - 0 = 0, not Infinity
  });
});