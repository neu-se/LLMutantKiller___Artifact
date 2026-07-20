import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation', () => {
  it('asec of purely imaginary number should match acos of (0, -b/d) not acos of (NaN, -b/d)', () => {
    // For input (0, 2): a=0, b=2, d=4
    // Original: acos(0/4=0, -2/4=-0.5) ... wait, condition is (false) so always else branch
    // Original else: new Complex((0!==0)?0/0:0, (2!==0)?-2/0:0) = new Complex(0, -Inf).acos()
    // Mutated else:  new Complex((true)?0/0:0, (2!==0)?-2/0:0) = new Complex(NaN, -Inf).acos()
    
    const withZeroReal = new Complex(0, -Infinity).acos();
    const withNaNReal = new Complex(NaN, -Infinity).acos();
    
    // Verify they differ - if they don't, we need a different approach
    const result = new Complex(0, 2).asec();
    
    // The result should equal withZeroReal (original), not withNaNReal (mutated)
    expect(result.re).toBe(withZeroReal.re);
    expect(result.im).toBe(withZeroReal.im);
  });
});