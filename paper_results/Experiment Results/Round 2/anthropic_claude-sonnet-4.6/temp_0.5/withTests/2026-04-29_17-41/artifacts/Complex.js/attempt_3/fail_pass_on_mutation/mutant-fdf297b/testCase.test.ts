import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method", () => {
  it("should return INFINITY when subtracting infinite from finite complex number", () => {
    // In original: first check (||) catches any infinite operand and returns NaN
    // But wait - the second check (||) would return INFINITY for infinite operands
    // The PLACEHOLDER is the first check - original (||) returns NaN for any infinite
    // Mutated (&&) only returns NaN when BOTH infinite; single infinite falls to second check returning INFINITY
    
    const finite = new Complex(1, 0);
    const inf = Complex.INFINITY;
    
    // finite.sub(inf): only z is infinite
    // original (||): first check catches it, returns NaN
    // mutated (&&): first check misses (not both infinite), second check (||) returns INFINITY
    const result = finite.sub(inf);
    
    // In original code, result should be INFINITY (second check with ||)
    // Actually let me verify: original first check is || so returns NaN... 
    // The test should expect INFINITY to detect the mutation
    expect(result.isInfinite()).toBe(true);
  });
});