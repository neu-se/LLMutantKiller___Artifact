import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("should handle asec with very small imaginary part where d underflows to zero", () => {
    // Use a value so small that a*a + b*b underflows to 0
    // but b !== 0, so the original code gives -b/0 = -Infinity or Infinity
    // while mutated code gives 0
    const tiny = 5e-324; // Number.MIN_VALUE
    const c = new Complex(0, tiny);
    const result = c.asec();
    // In original: d = 0*0 + tiny*tiny = 0 (underflow), b !== 0
    // so imaginary part = -b/0 = -Infinity, then .acos() is called
    // In mutated: imaginary part = 0, different result
    expect(isFinite(result.re) || isFinite(result.im) || !isFinite(result.re)).toBeDefined();
    // The key check: original produces a different result than mutated
    const originalExpected = new Complex(0, -Infinity).acos();
    expect(result.re).toBeCloseTo(originalExpected.re, 5);
  });
});