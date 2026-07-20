import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch is inverse of sinh for small complex inputs", () => {
    // For very small z where d underflows, acsch should not return 0
    // sinh(acsch(z)) should equal z if acsch works correctly
    // If mutation makes acsch return 0, then sinh(0) = 0 ≠ z
    const z = new Complex(Number.MIN_VALUE, Number.MIN_VALUE);
    const result = z.acsch();
    // In original: result is NaN (from -Infinity path)
    // In mutated: result is 0 (from 0 path)  
    // Check: result should not be zero
    expect(result.re === 0 && result.im === 0).toBe(false);
  });
});