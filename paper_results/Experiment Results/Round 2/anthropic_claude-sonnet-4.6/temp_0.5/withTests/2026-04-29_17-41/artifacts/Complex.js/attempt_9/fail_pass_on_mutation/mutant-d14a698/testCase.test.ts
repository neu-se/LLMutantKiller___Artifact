import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('directly verify acos(0, -Infinity) result to understand mutation impact', () => {
    // Directly test what acos gives for (0, -Inf) vs (0, +Inf)
    const negInf = new Complex(0, -Infinity).acos();
    const posInf = new Complex(0, Infinity).acos();
    
    // If these differ, we can use them to detect the mutation
    // The mutation flips sign: -b/0 becomes +b/0
    // For b > 0: original gives -Inf, mutated gives +Inf
    // So we need input where d===0, a=0, b>0
    // Use b = 1e-162 so b*b = 1e-324 = Number.MIN_VALUE (not 0!)
    // Use b = 1e-200 so b*b underflows... let's check
    
    // Actually let's find exact crossover
    // 2^-537 squared = 2^-1074 = Number.MIN_VALUE (smallest denormal), not 0
    // 2^-538 squared = 2^-1076 < 2^-1074, underflows to 0
    
    const tiny = Math.pow(2, -538);
    expect(tiny * tiny).toBe(0); // should underflow
    expect(tiny).not.toBe(0); // but tiny itself is nonzero
    
    const c = new Complex(0, tiny);
    const result = c.asec();
    
    // original: new Complex(0, -Inf).acos()
    // mutated: new Complex(0, +Inf).acos()
    expect(result.re).toEqual(negInf.re);
    expect(result.im).toEqual(negInf.im);
  });
});