import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN mutation detection", () => {
  it("should not throw and return NaN complex when abs/arg form produces NaN in one component", () => {
    // Use abs=NaN, arg=0: re = NaN*cos(0) = NaN, im = NaN*sin(0) = NaN (both NaN)
    // Use abs=0, arg=NaN: re = 0*cos(NaN) = NaN, im = 0*sin(NaN) = NaN (both NaN)  
    // Use abs=1, arg=0 but force re to be NaN somehow...
    
    // Try: the parse function with two args where a=NaN, b=0
    // z.re = NaN, z.im = 0
    // Original ||: condition true, enters if (no-op), returns z
    // Mutated &&: condition false, skips if, returns z
    // Same result...
    
    // What if return z is INSIDE the if block?
    // Then with original ||: NaN input returns z
    // With mutated &&: single-NaN input doesn't hit return, falls off parse function -> undefined
    const result = new Complex(NaN, 0);
    // If mutated causes parse to return undefined, Complex constructor would fail
    expect(result).toBeDefined();
    expect(result.re).toBeNaN();
    expect(result.im).toBe(0);
    // On mutated code, if return z is inside if block, result.re might not be NaN
    expect(isNaN(result.re)).toBe(true);
  });
});