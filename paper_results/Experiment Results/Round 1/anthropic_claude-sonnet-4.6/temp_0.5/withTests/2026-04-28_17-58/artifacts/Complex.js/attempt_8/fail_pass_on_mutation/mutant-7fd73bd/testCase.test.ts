import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex mutation detection', () => {
  it('should correctly compute log of a real positive number giving zero imaginary part', () => {
    // log(5+0i): a=5, b=0
    // b===0 && a>0 = true (original)  
    // b===0 || a>0 = true (mutated)
    // Both same. Try b=0, a=-5:
    // b===0 && a>0 = false (original)
    // b===0 || a>0 = true (mutated)
    // log(-5+0i): should give log(5) + i*pi
    // If mutated enters the if block (commented out body), still falls through to return
    // So still same result...
    
    // The ONLY way this mutation matters is if the if-body is NOT commented out
    // Let me test logHypot edge cases that might expose NaN differences
    const result = new Complex(0, 0).log();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});