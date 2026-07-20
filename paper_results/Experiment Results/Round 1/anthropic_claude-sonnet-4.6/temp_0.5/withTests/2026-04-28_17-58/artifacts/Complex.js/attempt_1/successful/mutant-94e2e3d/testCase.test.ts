import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow mutation detection', () => {
  it('should correctly compute 0^i (base zero, purely imaginary exponent)', () => {
    // 0^(0+1i): base is 0+0i, exponent has re=0, im=1
    // Original: z['re'] > 0 fails, falls through to general computation
    // Mutated: z['re'] >= 0 succeeds, returns ZERO
    const result = new Complex(0, 0).pow(new Complex(0, 1));
    // The result should NOT be zero in the original
    // logHypot(0, 0) = -Infinity, exp(-Infinity * 0 - (-Infinity) * 0) = exp(NaN) = NaN
    // Actually this would be NaN, not zero
    expect(result.isNaN()).toBe(true);
  });
});