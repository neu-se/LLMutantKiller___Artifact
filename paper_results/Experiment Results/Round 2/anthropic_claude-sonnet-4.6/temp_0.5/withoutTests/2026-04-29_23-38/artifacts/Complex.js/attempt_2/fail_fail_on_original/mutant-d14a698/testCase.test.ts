import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('detects sign change in imaginary part when b is subnormal causing d to underflow to zero', () => {
    // Use extremely small b value where b*b underflows to 0 but b !== 0
    // This makes d = a*a + b*b = 0 while bypassing the early return (a===0 && b===0)
    const b = 5e-324; // smallest positive subnormal double
    const a = 0;
    // b !== 0, a === 0, but b*b = 0 (underflow), so d = 0
    // early return: a === 0 && b === 0 is FALSE (b !== 0)
    // d !== 0 is FALSE, so we go to else branch
    // Original: new Complex(0, -b/0).acos() = new Complex(0, -Infinity).acos()
    // Mutated:  new Complex(0, +b/0).acos() = new Complex(0, +Infinity).acos()
    const result = new Complex(a, b).asec();
    
    // acos(0 - i*Inf) has negative imaginary part
    // acos(0 + i*Inf) has positive imaginary part  
    expect(result.im).toBeLessThan(0);
  });
});