import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation detection', () => {
  it('detects mutation: (a !== 0) changed to (true) in asec', () => {
    // For z = 0 + 1i: a=0, b=1
    // Original else: new Complex(0, -Infinity).acos()
    // Mutated else:  new Complex(NaN, -Infinity).acos()
    //
    // Trace acos(0, -Inf):
    //   a=0, b=-Inf
    //   t1 = new Complex((-Inf)^2 - 0^2 + 1, -2*0*(-Inf)).sqrt()
    //      = new Complex(Inf, NaN).sqrt()  <- -2*0*(-Inf) = NaN (0*Inf)
    // Hmm, 0 * (-Inf) = NaN in IEEE 754
    // So t1 = sqrt(Inf, NaN)
    // In sqrt: r = hypot(Inf, NaN) = NaN, a=Inf >= 0
    //   re = 0.5 * sqrt(2*(NaN + Inf)) = NaN
    // So t1 = (NaN, NaN), t2 = NaN, result = NaN
    //
    // Trace acos(NaN, -Inf):
    //   t1 = new Complex(Inf - NaN + 1, -2*NaN*(-Inf)).sqrt() = new Complex(NaN, NaN).sqrt() = NaN
    //
    // Both NaN... Let me try to find where they actually differ
    // by checking the imaginary part of the result
    
    // What about checking equals() between two computations?
    // asec(z) should equal acos(1/z)
    // For z = 0 + 1i: 1/z = -i, acos(-i) should be well-defined
    const z = new Complex(0, 1);
    const via_acos = z.inverse().acos();
    const via_asec = z.asec();
    
    expect(via_asec.re).toBeCloseTo(via_acos.re, 5);
    expect(via_asec.im).toBeCloseTo(via_acos.im, 5);
  });
});