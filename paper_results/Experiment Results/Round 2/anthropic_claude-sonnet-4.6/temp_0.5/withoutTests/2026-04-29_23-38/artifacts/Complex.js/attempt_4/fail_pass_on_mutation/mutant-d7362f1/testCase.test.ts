import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul", () => {
  it("should correctly multiply a real number by a complex number with non-zero imaginary part", () => {
    // Original code structure in mul (after infinity/zero checks):
    //   if (z['im'] === 0 && this['im'] === 0) {  // <-- PLACEHOLDER line (first if)
    //     return new Complex(this['re'] * z['re'], 0);
    //   }
    //   if (z['im'] === 0 && this['im'] === 0) {  // second if (unchanged)
    //     return new Complex(this['re'] * z['re'], 0);
    //   }
    //   return new Complex(re*re - im*im, re*im + im*re);
    //
    // Mutated code:
    //   if (z['im'] === 0 && this[""] === 0) {  // always false
    //     return new Complex(this['re'] * z['re'], 0);
    //   }
    //   if (z['im'] === 0 && this['im'] === 0) {  // second if still works
    //     return new Complex(this['re'] * z['re'], 0);
    //   }
    //   return new Complex(re*re - im*im, re*im + im*re);
    //
    // Both still give same result for real*real case due to second if.
    // Need a case where ONLY the first if matters...
    // But both ifs have same condition, so they're equivalent.
    //
    // Wait - maybe the PLACEHOLDER replaces something DIFFERENT.
    // Let me re-read: the placeholder value is just the if-line itself,
    // meaning the placeholder IS the if statement line (not a separate preceding line).
    // So original: if (z['im'] === 0 && this['im'] === 0) {
    // Mutated:     if (z['im'] === 0 && this[""] === 0) {
    // There's only ONE such if block, not two.
    
    // So for real * real: original uses optimization, mutated uses general formula.
    // Results are mathematically identical.
    
    // The ONLY detectable difference must be numerical edge cases.
    // Let me try with im = 0 but constructed differently.
    
    // Actually: what if this['im'] is 0 but z['im'] is NOT 0?
    // Original: condition false (z.im != 0), uses general formula
    // Mutated: condition false (this[""] != 0), uses general formula  
    // Same.
    
    // What if z['im'] IS 0 but this['im'] is NOT 0?
    // Original: condition false (this.im != 0), uses general formula
    // Mutated: condition false (this[""] != 0), uses general formula
    // Same.
    
    // The mutation is truly equivalent mathematically. Unless...
    // What about NaN inputs? If this['im'] is NaN:
    // Original: NaN === 0 is false -> general formula
    // Mutated: undefined === 0 is false -> general formula
    // Same path, same result.
    
    // I'm going to try a completely different approach and look at whether
    // the placeholder might be replacing something other than just that if line.
    // The placeholder value "-         if (z['im'] === 0 && this['im'] === 0) {"
    // suggests it's just that one line.
    
    // Let me try with specific values where floating point might differ:
    // For im=0: optimization gives exactly re*re
    // General formula gives re*re - 0*0 = re*re (same)
    // The im part: optimization gives 0, general gives re*0 + 0*re = 0 (same)
    
    // I genuinely cannot find a behavioral difference. Let me try the test anyway
    // with a case that exercises the code path most directly.
    
    const a = new Complex(2, 1);
    const b = new Complex(3, 0);
    // a * b = (2+i)(3) = 6 + 3i
    const result = a.mul(b);
    expect(result.re).toBeCloseTo(6, 10);
    expect(result.im).toBeCloseTo(3, 10);
  });
});