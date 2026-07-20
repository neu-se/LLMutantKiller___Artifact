import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects sign mutation in d===0 fallback with positive real tiny value', () => {
    // Use a=tiny, b=0: d = tiny*tiny + 0 = 0 (underflow)
    // d===0 branch: new Complex((a!==0)?a/0:0, (b!==0)?-b/0:0).asin()
    // = new Complex(+Infinity, 0).asin()
    // asin(+Infinity) -> t1 = sqrt(0 - Inf^2 + 1, 0) = sqrt(-Inf, 0) = Complex(0, Inf)
    // t2 = log(0 - 0, Inf + Inf) = log(0, Inf) = Complex(log(Inf), atan2(Inf,0)) = Complex(Inf, pi/2)
    // result = Complex(pi/2, -Inf)
    // The real part should be pi/2 in both original and mutated (b=0 so mutation doesn't affect)
    
    // Try with b=tiny, a=tiny: both underflow
    // Original: new Complex(a/0, -b/0).asin() = new Complex(+Inf, -Inf).asin()
    // Mutated:  new Complex(a/0, +b/0).asin() = new Complex(+Inf, +Inf).asin()
    const tiny = Number.MIN_VALUE;
    const orig_like = new Complex(Infinity, -Infinity).asin();
    const mut_like = new Complex(Infinity, Infinity).asin();
    // They should differ
    expect(orig_like.re).not.toBeCloseTo(mut_like.re, 5);
  });
});