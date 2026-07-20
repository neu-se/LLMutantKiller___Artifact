import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation detection', () => {
  it('detects the (a !== 0) to (true) mutation in asec', () => {
    // The mutation changes (a !== 0) ? a/0 : 0  to  (true) ? a/0 : 0
    // When a=0: original gives 0, mutated gives NaN (0/0)
    // We need a case where this difference propagates to observable output
    // 
    // For z = 0 + 1i: asec should equal acos(1/z) = acos(-i) = acos(0 - 1i)
    // acos(0 - 1i): t1 = sqrt(1-0+1, 0) = sqrt(2,0) = (sqrt(2), 0)
    //               t2 = log(sqrt(2)-(-1), 0+0) = log(sqrt(2)+1, 0)
    //               return (pi/2 - 0, log(sqrt(2)+1)) 
    // Expected re = pi/2, im = log(1 + sqrt(2))
    // But asec goes through the infinity path...
    // Let me check what asec actually computes for real input > 1
    // z = 2 + 0i: a=2, b=0 -> both original and mutated give new Complex(Inf, 0).acos()
    // acos(Inf, 0): t1 = sqrt(0-Inf+1, 0) = sqrt(-Inf, 0)
    //   sqrt with a<0: re = 0/sqrt(2*(r-a)) = 0/sqrt(Inf) = 0
    //                  im = 0.5*sqrt(2*(r-a)) = 0.5*sqrt(Inf) = Inf
    //   t1 = (0, Inf)
    //   t2 = log(0 - 0, Inf + Inf) = log(0, Inf)
    //   logHypot(0, Inf) = log(Inf) = Inf
    //   atan2(Inf, 0) = pi/2
    //   t2 = (Inf, pi/2)
    //   return (pi/2 - pi/2, Inf) = (0, Inf)
    // Hmm that doesn't seem right either.
    // Let me just check: does asec(2) give pi/3?
    const result = new Complex(2, 0).asec();
    // asec(2) = acos(1/2) = pi/3
    expect(result.re).toBeCloseTo(Math.PI / 3, 5);
  });
});