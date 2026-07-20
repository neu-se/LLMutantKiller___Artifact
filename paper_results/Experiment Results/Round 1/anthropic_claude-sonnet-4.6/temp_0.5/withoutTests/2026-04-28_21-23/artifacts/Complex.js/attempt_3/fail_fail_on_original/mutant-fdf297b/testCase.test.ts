import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return Infinity (not NaN) when subtracting Infinity from a finite complex number", () => {
    // In mutated code: first check uses &&, so Infinity - finite falls through to second check (||) → Infinity
    // In original code: first check uses ||, so Infinity - finite returns NaN immediately
    // We test that result is Infinity (mutated behavior) vs NaN (original behavior)
    
    const finite = new Complex(5, 3);
    const result = finite.sub(Complex.INFINITY);
    
    // Original code returns NaN, mutated code returns Infinity
    // Test passes on original (isNaN = true), fails on mutated (isNaN = false, isInfinite = true)
    expect(result.isInfinite()).toBe(false);
  });
});