import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul", () => {
  it("should correctly multiply two real numbers using the optimized path", () => {
    // The mutation changes the condition of the optimization check in mul.
    // Original: if (z['im'] === 0 && this['im'] === 0) -> uses optimized path
    // Mutated:  if (z['im'] === 0 && this[""] === 0)   -> this[""] is undefined, always false
    //
    // When both numbers are real (im=0), original takes optimization returning
    // new Complex(this['re'] * z['re'], 0)
    // Mutated falls through to general formula:
    // new Complex(this['re'] * z['re'] - 0*0, this['re']*0 + 0*z['re'])
    // = new Complex(this['re'] * z['re'], 0)
    // Mathematically identical.
    //
    // The ONLY detectable difference must be in the structure of the code.
    // Looking again at the full mul method - the placeholder comes BEFORE
    // another if with the same condition. So in original code there are
    // TWO identical if-checks. The placeholder is an OUTER if wrapping the inner if.
    //
    // Original structure:
    // if (z.im===0 && this.im===0) {   <- PLACEHOLDER (outer)
    //   if (z.im===0 && this.im===0) { <- inner (always true inside outer)
    //     return new Complex(re*re, 0);
    //   }
    // }                                <- closes outer
    // return new Complex(general...);
    //
    // Mutated structure:
    // if (z.im===0 && this[""]==0) {   <- always false
    //   if (z.im===0 && this.im===0) { <- never reached
    //     return new Complex(re*re, 0);
    //   }
    // }
    // return new Complex(general...);
    //
    // For real*real: original returns optimization, mutated returns general formula.
    // Both give same result. The mutation IS equivalent for all inputs.
    //
    // UNLESS: I'm wrong about the structure. Let me try: what if the placeholder
    // is NOT an outer if, but rather the placeholder replaces a DIFFERENT line,
    // and the shown if-block is a SEPARATE statement?
    //
    // If placeholder value is "if (z['im'] === 0 && this['im'] === 0) {"
    // and this is the OPENING LINE of the shown if-block (i.e., the placeholder
    // IS that if-block's condition line), then there's only ONE if-block.
    //
    // In that case the mutation just changes the condition of the only optimization check.
    // For real*real: both paths give same result.
    //
    // I'll try testing with a case that might reveal floating point differences
    // or use a property that distinguishes the two code paths.
    
    // Try with Infinity inputs to see if there's a difference
    const a = new Complex(Infinity, 0);
    const b = new Complex(0, 0);
    // This hits the Infinity*0=NaN check first, so not affected by our mutation
    
    // Try real * real where result might differ
    const c = new Complex(3, 0);
    const d = new Complex(4, 0);
    const result = c.mul(d);
    expect(result.re).toBe(12);
    expect(result.im).toBe(0);
    // Both original and mutated give same result here
    
    // The only hope: test that the function returns the SAME object type/path
    // by checking valueOf() which returns re when im===0
    expect(result.valueOf()).toBe(12);
  });
});