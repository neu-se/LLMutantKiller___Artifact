import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('asec imaginary sign flip detection via acsc comparison', () => {
    // The mutation flips sign of imaginary infinity in the d===0 else branch of asec
    // acsc has the same structure but is unmutated
    // For the same tiny input, acsc and asec should have related results
    // asec(z) = acos(1/z), acsc(z) = asin(1/z)
    // For z = new Complex(0, tiny) where d underflows:
    // asec: new Complex(0, -b/d_sign).acos() 
    // acsc: new Complex(0, -b/d_sign).asin()
    
    // Let's find the actual difference by testing with a value where we KNOW d=0
    const tiny = Math.pow(2, -538);
    expect(tiny * tiny).toBe(0);
    expect(tiny).toBeGreaterThan(0);
    
    // For asec(0, tiny): d=0, a=0, b=tiny>0
    // original: new Complex(0, -tiny/0).acos() = new Complex(0, -Inf).acos()
    // mutated:  new Complex(0, +tiny/0).acos() = new Complex(0, +Inf).acos()
    
    // Directly compute both to see if they differ
    const fromNegInf = new Complex(0, -Infinity).acos();
    const fromPosInf = new Complex(0, Infinity).acos();
    
    // They must differ for the mutation to be detectable
    // If re parts differ:
    if (fromNegInf.re !== fromPosInf.re || fromNegInf.im !== fromPosInf.im) {
      const result = new Complex(0, tiny).asec();
      expect(result.re).toEqual(fromNegInf.re);
      expect(result.im).toEqual(fromNegInf.im);
    } else {
      // They're the same - try with nonzero a
      const fromPInfNInf = new Complex(Infinity, -Infinity).acos();
      const fromPInfPInf = new Complex(Infinity, Infinity).acos();
      expect(fromPInfNInf.re).not.toEqual(fromPInfPInf.re);
    }
  });
});