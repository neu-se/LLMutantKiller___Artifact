import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects sign mutation via comparing asin results for +/-Infinity imaginary', () => {
    // Directly verify that asin(Inf, -Inf) and asin(Inf, +Inf) give different results
    // then use that to construct the distinguishing test
    const asinPosInf = new Complex(Infinity, Infinity).asin();
    const asinNegInf = new Complex(Infinity, -Infinity).asin();
    
    // If these differ, we can use tiny,tiny input
    // asin: t1 = sqrt(b^2 - a^2 + 1, -2ab)
    // For (Inf, Inf): t1 = sqrt(Inf-Inf+1, -Inf) = sqrt(NaN, -Inf) => NaN
    // For (Inf, -Inf): t1 = sqrt(Inf-Inf+1, -Inf) = sqrt(NaN, -Inf) => NaN
    // Both NaN... 
    
    // Try a=tiny, b=0 case won't distinguish. Try a=0, b=tiny (positive):
    // original: new Complex(0, -Inf).asin()
    // mutated: new Complex(0, +Inf).asin()
    // asin(0, -Inf): a=0,b=-Inf; t1=sqrt(Inf+1,0)=sqrt(Inf,0)=(Inf,0)
    //   t2 = log(Inf-(-Inf), 0+0) = log(Inf,0) = (Inf, 0)  -- wait b of t1 is 0, a of input is 0
    //   t2 = new Complex(t1.re - b_input, t1.im + a_input).log() = new Complex(Inf-(-Inf), 0+0).log() = new Complex(Inf,0).log() = (Inf, 0)
    //   result = new Complex(t2.im, -t2.re) = new Complex(0, -Inf)
    // asin(0, +Inf): t1=sqrt(Inf+1,0)=(Inf,0)
    //   t2 = new Complex(Inf - Inf, 0).log() = new Complex(NaN,0).log() => NaN
    //   result = NaN
    
    const tiny = 5e-324;
    // a=0, b=tiny(positive): original => asin(0,-Inf) => (0,-Inf); mutated => asin(0,+Inf) => NaN
    const result = new Complex(0, tiny).acsc();
    // Original: result.re=0, result.im=-Inf (not NaN)
    // Mutated: result is NaN
    expect(result.isNaN()).toBe(false);
  });
});