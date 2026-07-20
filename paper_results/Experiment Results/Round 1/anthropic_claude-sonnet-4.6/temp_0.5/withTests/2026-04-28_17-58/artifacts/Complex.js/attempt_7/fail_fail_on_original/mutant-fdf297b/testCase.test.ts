import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub", () => {
  it("subtracting two infinite numbers should return NaN not Infinity", () => {
    const result = Complex['INFINITY'].sub(Complex['INFINITY']);
    // If first if uses || (original): both infinite → NaN ✓
    // If first if uses && (mutated): both infinite → NaN too, but then second if || → would also return NaN
    // The key: with mutated &&, only-one-infinite case:
    //   first && check: false (not both infinite)  
    //   second || check: true → Infinity
    // With original ||, only-one-infinite:
    //   first || check: true → NaN
    expect(result.isNaN()).toBe(true);
    
    // Now test one-infinite case to distinguish
    const result2 = new Complex(1, 0).sub(Complex['INFINITY']);
    // Original (first if is ||): NaN
    // Mutated (first if is &&): Infinity  
    expect(result2.isNaN()).toBe(true);
  });
});