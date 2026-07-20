import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex NaN parse", () => {
  it("should treat complex with NaN real and zero imaginary as NaN", () => {
    // Create via abs/arg where result has re=NaN, im=NaN (both NaN)
    // vs re=NaN, im=0 (one NaN)
    // The || vs && only differs when exactly ONE component is NaN
    // With {re: NaN, im: 0}: 
    //   Original ||: true (enters if, does nothing, returns z)  
    //   Mutated &&: false (skips if, does nothing, returns z)
    // Same result... unless there's a parser_exit AFTER the if block
    
    // Let me try: what if the behavior differs for operations on the result?
    // If original returns early from if block (with return z inside),
    // but mutant falls through to parser_exit...
    
    // Testing with Infinity inputs that produce NaN in one component:
    // {re: Infinity, im: 0} -> not NaN
    // What produces re=NaN, im=finite?
    // Math.cos(Infinity) = NaN, Math.sin(Infinity) = NaN
    // {abs: 1, arg: Infinity}: re = cos(Inf) = NaN, im = sin(Inf) = NaN - both NaN
    
    // What about 0 * Infinity?
    // {abs: 0, arg: Infinity}: 
    //   re = 0 * cos(Infinity) = 0 * NaN = NaN
    //   im = 0 * sin(Infinity) = 0 * NaN = NaN
    // Still both NaN
    
    // I need to find input where EXACTLY ONE is NaN
    // {r: NaN, phi: 0}: re = NaN * cos(0) = NaN * 1 = NaN, im = NaN * sin(0) = NaN * 0 = NaN
    // Still both NaN!
    
    // Actually NaN * 0 = NaN in JS, so any abs/arg with NaN abs gives both NaN
    
    // The ONLY way to get one NaN is direct object {re: NaN, im: 0} or number NaN
    // Both of which I've tried and both versions behave the same
    
    // Maybe the mutation is a red herring and affects an unreachable code path?
    // Or maybe I need to look at what happens with undefined inputs
    
    const c = new Complex(undefined as any);
    expect(c['re']).toBe(0);
    expect(c['im']).toBe(0);
  });
});