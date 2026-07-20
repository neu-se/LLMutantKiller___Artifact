import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('asec(z) equals acos(1/z) for complex z with small magnitude causing d underflow', () => {
    // The mutation changes the sign of imaginary part in the else branch
    // Use negative subnormal b to make original give +Inf and mutant give -Inf
    const b = -5e-324;
    const a = 0;
    // d = a*a + b*b = 0 (underflow), b !== 0
    // Original else: Complex(0, -b/0) = Complex(0, +Inf) → .acos()
    // Mutated else:  Complex(0, +b/0) = Complex(0, -Inf) → .acos()
    
    // Verify what acos gives for +Inf vs -Inf imaginary
    const acosNegInf = new Complex(0, -Infinity).acos();
    const acosPosInf = new Complex(0, Infinity).acos();
    
    const result = new Complex(a, b).asec();
    
    // Check if result matches original path (acosPosInf) or mutated path (acosNegInf)
    const matchesOriginal = (isNaN(result.re) === isNaN(acosPosInf.re)) && 
                            (isNaN(result.im) === isNaN(acosPosInf.im));
    const matchesMutated = (isNaN(result.re) === isNaN(acosNegInf.re)) && 
                           (isNaN(result.im) === isNaN(acosNegInf.im));
    
    expect(matchesOriginal).toBe(true);
    expect(matchesMutated).toBe(false);
  });
});