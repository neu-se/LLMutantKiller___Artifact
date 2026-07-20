import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc with a=0 and subnormal b reaches d=0 branch, original gives different re than mutated", () => {
    // With a=0, b=5e-324 (Number.MIN_VALUE, smallest subnormal):
    // d = 0*0 + (5e-324)*(5e-324) = 0 (underflows to 0 in IEEE 754)
    // b !== 0, so early return (a===0 && b===0) does NOT fire
    // We reach d===0 branch:
    //   Original: new Complex((0!==0)?0/0:0, (b!==0)?-b/0:0).asin()
    //           = new Complex(0, -Infinity).asin()
    //   Mutated:  new Complex((true)?0/0:0, (b!==0)?-b/0:0).asin()
    //           = new Complex(NaN, -Infinity).asin()
    //
    // Tracing asin(0, -Infinity):
    //   a=0, b=-Infinity
    //   t1 = new Complex(b*b - a*a + 1, -2*a*b).sqrt()
    //      = new Complex(Infinity + 1, 0).sqrt()
    //      = new Complex(Infinity, 0).sqrt()
    //      = new Complex(Infinity, 0)  [since a>=0, b=0: sqrt(Infinity,0)=(sqrt(Inf),0)=(Inf,0)]
    //   t2 = new Complex(t1.re - b, t1.im + a).log()
    //      = new Complex(Inf - (-Inf), 0 + 0).log()
    //      = new Complex(Inf + Inf, 0).log()
    //      = new Complex(Infinity, 0).log()
    //      = new Complex(logHypot(Inf,0), atan2(0,Inf)).log() -- wait log not recursive
    //      logHypot(Inf, 0) = log(Inf) = Infinity
    //      atan2(0, Inf) = 0
    //   result = new Complex(t2.im, -t2.re) = new Complex(0, -Infinity)
    //
    // Tracing asin(NaN, -Infinity):
    //   a=NaN, b=-Infinity
    //   t1 = new Complex(Inf - NaN + 1, -2*NaN*(-Inf)).sqrt() = new Complex(NaN, NaN).sqrt()
    //   t2 = new Complex(NaN - (-Inf), NaN + NaN).log() = new Complex(NaN, NaN).log()
    //   result = new Complex(NaN, NaN)
    //
    // So original gives (0, -Infinity), mutated gives (NaN, NaN)!
    
    const result = new Complex(0, 5e-324).acsc();
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBe(0);
  });
});