import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('detects mutation in acoth: negative tiny a gives different im part', () => {
    const tiny = -5e-324; // negative subnormal: a*a = 0, so d = 0, but a !== 0
    const c = new Complex(tiny, 0);
    const result = c.acoth();
    // Original: atanh(-Infinity, 0)
    //   noIM = false (-Inf not > 1)
    //   oneMinus = 1 - (-Inf) = Inf, onePlus = 1 + (-Inf) = -Inf
    //   d = Inf*Inf = Inf
    //   x.re = (-Inf * Inf - 0) / Inf = -Inf/Inf = NaN
    //   x.im = (0 * Inf + (-Inf) * 0) / Inf = 0/Inf = 0
    //   logHypot(NaN, 0) = NaN
    //   atan2(0, NaN) = NaN
    //   result: (NaN, NaN)
    // Mutant: atanh(0, 0) = (0, 0)
    // So original gives NaN, mutant gives 0
    // Test that im is NaN in original
    expect(result.im).toBeNaN();
  });
});