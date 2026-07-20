import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul", () => {
  it("should handle multiplication where z.im is 0 but this.im is non-zero, checking general formula", () => {
    // After much analysis, the key insight is:
    // Original structure:
    //   if (z['im'] === 0 && this['im'] === 0) {  // PLACEHOLDER
    //     if (z['im'] === 0 && this['im'] === 0) { // inner if
    //       return new Complex(this['re'] * z['re'], 0);
    //     }
    //   }                                          // closes PLACEHOLDER block
    //   return new Complex(general formula)
    //
    // Mutated structure:
    //   if (z['im'] === 0 && this[""] === 0) {  // always false
    //     if (z['im'] === 0 && this['im'] === 0) {
    //       return new Complex(this['re'] * z['re'], 0);
    //     }
    //   }
    //   return new Complex(general formula)
    //
    // For real*real (both im=0): original returns optimization (im=0 exact)
    // mutated returns general formula (im = re*0 + 0*re = 0, also exact)
    // No difference.
    //
    // BUT WAIT: What if we look at this differently?
    // What if the PLACEHOLDER is NOT an if-statement opening a block,
    // but rather a complete if-statement on one line?
    // In JS: "if (cond) { ... }" can span multiple lines.
    // The placeholder value ends with "{" so it opens a block.
    // The next line is another if statement.
    // Then "}" closes... which block?
    //
    // If the "}" closes the PLACEHOLDER's block, then the inner if is inside it.
    // If the "}" closes the inner if's block, then the placeholder has no closing "}"
    // which would be a syntax error.
    //
    // So the inner if IS inside the placeholder's block.
    // The structure is nested ifs with identical conditions.
    // Changing the outer condition to always-false makes the inner if unreachable.
    // But the general formula gives the same result for real*real.
    //
    // I need to accept that this mutation might only be detectable through
    // the -0 vs 0 distinction. Let me verify with Object.is:
    
    const a = new Complex(5, -0);
    const b = new Complex(3, 0);
    const result = a.mul(b);
    
    // Original: outer if: z.im===0 (true) && this.im===0 (-0===0 is true) -> enters outer
    //           inner if: same condition, true -> returns new Complex(15, 0) [+0]
    // Mutated:  outer if: z.im===0 (true) && this[""]===0 (undefined===0 is false) -> skips
    //           general formula: 5*3 - (-0)*0 = 15, im = 5*0 + (-0)*3 = 0 + (-0) = -0
    //
    // So original gives im=+0, mutated gives im=-0
    // Object.is(+0, -0) is false, Object.is(-0, -0) is true
    
    expect(Object.is(result.im, 0)).toBe(true);  // passes original (+0), fails mutated (-0)
  });
});