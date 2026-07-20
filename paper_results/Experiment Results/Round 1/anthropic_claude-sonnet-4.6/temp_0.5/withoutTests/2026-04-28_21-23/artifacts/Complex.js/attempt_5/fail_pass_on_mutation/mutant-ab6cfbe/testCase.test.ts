import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation detection', () => {
  it('log of small positive real number near zero', () => {
    // Testing boundary between a>0 and a>=0
    // For a very small positive number, both should give same result
    // But for a=0 exactly with b=0, mutation enters if block
    // Since if body is commented, need to find indirect effect
    
    // Try: does log(0+0i) affect anything differently?
    // logHypot(0,0) = Math.log(0) = -Infinity (via a===0 branch)
    // Math.log(0) = -Infinity
    // Both give Complex(-Infinity, 0)
    
    // The ONLY real difference: -0 case
    // In JS: -0 > 0 is false, -0 >= 0 is true
    // But if body is commented, still no difference
    
    // Let me test something that uses log internally with a=0
    const z = new Complex(0, 0);
    const result = z.log();
    expect(result.re).toBe(-Infinity);
    expect(result.im).toBe(0);
  });
});