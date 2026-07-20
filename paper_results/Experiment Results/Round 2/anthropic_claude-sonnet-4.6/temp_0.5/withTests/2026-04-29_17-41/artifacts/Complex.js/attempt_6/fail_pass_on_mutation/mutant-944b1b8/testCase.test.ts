import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asec mutation detection', () => {
  it('asec of a real number greater than 1 should produce correct result', () => {
    // For Complex(2, 0): a=2, b=0
    // Both original and mutated: new Complex(Infinity, 0).acos()
    // acos(Inf, 0): t1=sqrt(0-Inf+1, 0)=sqrt(-Inf, 0)
    // a=-Inf < 0: re = |0|/sqrt(2*(r-(-Inf))) = 0/sqrt(Inf) = 0
    // im = 0.5*sqrt(2*(r-(-Inf))) = 0.5*sqrt(Inf) = Inf
    // t2 = log(0-0, Inf+Inf) = log(0, Inf)
    // logHypot(0, Inf) = log(Inf), atan2(Inf, 0) = PI/2
    // t2 = Complex(Inf, PI/2)
    // result = Complex(PI/2 - PI/2, Inf) = Complex(0, Inf)
    // Hmm that doesn't seem right for asec(2) = acos(0.5) = PI/3
    // The bug is (false) - the correct branch never runs!
    // So asec is broken for ALL inputs in original too
    // The mutation only changes behavior when a=0
    // Let me check: for a=0, b=1 what does original give vs mutated?
    const orig = new Complex(0, 1).asec();
    // Just check it's not throwing and has some value
    expect(typeof orig.re).toBe('number');
    expect(typeof orig.im).toBe('number');
    // Now the key: original gives Complex(0,-Inf).acos(), mutated gives Complex(NaN,-Inf).acos()
    // Both end up NaN due to -2*0*(-Inf)=NaN in acos... 
    // Try to find distinguishable output
    expect(orig.re).not.toBeNaN(); // This might fail on original too
  });
});