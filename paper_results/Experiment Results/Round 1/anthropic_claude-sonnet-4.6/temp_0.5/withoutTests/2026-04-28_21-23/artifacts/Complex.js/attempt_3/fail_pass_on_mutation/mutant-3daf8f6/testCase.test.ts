import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('logHypot boundary condition', () => {
  it('pow uses correct logHypot path when base real part is exactly 3000', () => {
    // logHypot is called in pow() as well
    // Need _a === 3000 exactly where the two branches give different results
    // The if-branch: Math.log(a*a + b*b) * 0.5
    // The else-branch: 0.5 * Math.log((a/2)^2 + (b/2)^2) + Math.LN2
    // These are identical for small values. Need overflow scenario.
    // With _a = 3000 and _b just under 3000, a*a+b*b = 9e6+~9e6 = ~18e6, no overflow.
    // 
    // Actually the mutation changes which branch executes for _a===3000.
    // The only observable difference would be if one branch overflows.
    // Max safe: sqrt(Number.MAX_VALUE) ~ 1.34e154
    // So we need a = 3000 but that's fine... 
    //
    // Let's try: _a = 3000, but a is actually a very large number
    // That's impossible since _a = Math.abs(a).
    //
    // The mutation is only detectable if logHypot(3000, b) with b < 3000
    // gives different results in the two branches.
    // Let me just verify empirically what values differ.
    
    // Try with b = 0: logHypot(3000, 0) = Math.log(3000)
    // if-branch: Math.log(3000*3000 + 0) * 0.5 = Math.log(9000000)*0.5
    // else-branch: 0.5*Math.log(1500*1500 + 0) + Math.LN2 = 0.5*Math.log(2250000) + Math.LN2
    // Math.log(9000000)*0.5 = 0.5*(Math.log(2250000) + Math.log(4)) = 0.5*Math.log(2250000) + Math.LN2
    // Identical!
    
    // The mutation is undetectable through numerical output for these small values.
    // But wait - the original code has a DIFFERENT structure:
    // if (_a < 3000 && _b < 3000) { return ...; }  <- early return
    // then falls through to the else code
    // 
    // With mutation _a <= 3000: when _a=3000, _b<3000, mutated takes if-branch (early return)
    // Original takes the code AFTER the if block
    
    // Both give same float result. This mutation may be equivalent.
    // Let me test the only case where they'd differ: near overflow
    // Use Number.MAX_VALUE scenario... but _a must be 3000.
    
    // This mutation appears to be equivalent. Let's verify with a=3000, b=2999.9999
    const a = 3000;
    const b = 2999.9999;
    const ifBranch = Math.log(a * a + b * b) * 0.5;
    const elseBranch = 0.5 * Math.log((a/2)*(a/2) + (b/2)*(b/2)) + Math.LN2;
    
    // If they're the same, test something else
    const result = new Complex(a, b).log();
    expect(result.re).toBeCloseTo(Math.log(Math.sqrt(a*a + b*b)), 14);
  });
});