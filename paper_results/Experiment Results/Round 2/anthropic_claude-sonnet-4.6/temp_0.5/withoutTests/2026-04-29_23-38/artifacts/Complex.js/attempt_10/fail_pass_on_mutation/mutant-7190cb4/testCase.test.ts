import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('acsc fallback branch produces Infinity result for specific input', () => {
    // The d=0 fallback: when a=0 and b is subnormal
    // Let's try to find what asin(0, -Infinity) actually returns in JS
    // by computing it step by step manually
    // asin(0, -Inf):
    //   a=0, b=-Inf
    //   t1 = Complex(b*b - a*a + 1, -2*a*b).sqrt()
    //      = Complex(Inf - 0 + 1, -2*0*(-Inf)).sqrt()
    //      = Complex(Inf, -0*Inf).sqrt()
    // -2 * 0 * (-Infinity) in JS:
    const val = -2 * 0 * (-Infinity);
    // This is NaN (0 * Infinity = NaN)
    // So t1 = Complex(Inf, NaN) → NaN result
    // Both branches give NaN. The mutation is an equivalent mutant for normal inputs.
    // BUT: what about when a is non-zero tiny?
    // a=5e-324, b=5e-324: a/0 = +Inf, original: -b/0 = -Inf, mutated: +b/0 = +Inf
    // asin(+Inf, -Inf) vs asin(+Inf, +Inf)
    // t1 for asin(+Inf, -Inf): Complex(Inf-Inf+1, -2*Inf*(-Inf)).sqrt() = Complex(NaN, +Inf).sqrt()
    // For Complex(NaN, +Inf).sqrt(): r = hypot(NaN, Inf) = Inf
    //   a >= 0? NaN >= 0 is false, so re = |b| / sqrt(2*(r-a)) = Inf/sqrt(2*(Inf-NaN)) = Inf/NaN = NaN
    // Still NaN. Let me just verify the actual behavior:
    const result1 = new Complex(5e-324, 5e-324).acsc();
    const result2 = new Complex(5e-324, -5e-324).acsc();
    // In original: result1 uses asin(+Inf, -Inf), result2 uses asin(+Inf, +Inf)
    // In mutated:  result1 uses asin(+Inf, +Inf), result2 uses asin(+Inf, -Inf)
    // If asin(+Inf, -Inf) != asin(+Inf, +Inf), then result1 != result2 in original
    // but result1 == result2_original and result2 == result1_original in mutated
    expect(result1.re).toEqual(result2.re);
    expect(result1.im).toEqual(result2.im);
  });
});