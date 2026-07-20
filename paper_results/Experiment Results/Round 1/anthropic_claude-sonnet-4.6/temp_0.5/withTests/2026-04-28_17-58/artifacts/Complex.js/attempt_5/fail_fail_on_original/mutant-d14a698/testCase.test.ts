import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation detection', () => {
  it('detects sign change in d=0 fallback by comparing acos(0,-Inf) vs acos(0,+Inf)', () => {
    // Directly compute acos for the two paths to find observable difference
    const r1 = new Complex(0, -Infinity).acos();
    const r2 = new Complex(0, Infinity).acos();
    // These must differ for the test to be meaningful
    // acos(0, -Inf): t1=sqrt(Inf+1, 0)=sqrt(Inf,0)=(Inf,0)
    //   t2=log(Inf-(-Inf), 0+0)=log(Inf,0)=(Inf, 0)
    //   result=(PI/2 - 0, Inf) = (PI/2, Inf)
    // acos(0, +Inf): t1=sqrt(Inf+1, 0)=(Inf,0)
    //   t2=log(Inf-Inf, 0)=log(NaN,0)=(NaN,NaN)
    //   result=(PI/2-NaN, NaN)=(NaN,NaN)
    // So r1.im=Inf, r2.im=NaN - they differ!
    expect(r1.im).toBe(Infinity);
    expect(isNaN(r2.im)).toBe(true);

    // Now test asec with a=0, b=Number.MIN_VALUE
    // d = 0*0 + MIN_VALUE*MIN_VALUE = 0 (underflow), b != 0, a == 0
    // But wait: early return checks a===0 && b===0, so NOT triggered
    // Original: new Complex(0/0=NaN? No: a=0 so a/0=NaN... 
    // Actually: (a !== 0) ? a/0 : 0 => 0 (since a=0)
    // (b !== 0) ? -b/0 : 0 => -MIN_VALUE/0 = -Infinity (original)
    // (b !== 0) ? +b/0 : 0 => +MIN_VALUE/0 = +Infinity (mutated)
    // So original calls acos(0, -Inf) => (PI/2, Inf)
    // Mutated calls acos(0, +Inf) => (NaN, NaN)
    const z = new Complex(0, Number.MIN_VALUE);
    const result = z.asec();
    expect(result.im).toBe(Infinity);
  });
});