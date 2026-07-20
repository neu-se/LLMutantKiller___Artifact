import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc dead branch via NaN', () => {
  it('acsc result for input that routes through d=0 branch with nonzero b', () => {
    // If we could get d=0 with b!=0... not possible with real numbers
    // But what about Infinity inputs? a=Inf, b=0: d = Inf, not 0
    // Let me try: what if a and b are such that a*a + b*b underflows to 0?
    // Very small numbers: a = 5e-324 (min positive), b = 5e-324
    // a*a = 0 (underflow), b*b = 0 (underflow), d = 0
    // But a !== 0 and b !== 0, so early return doesn't fire!
    const tiny = 5e-324;
    const result = new Complex(tiny, tiny).acsc();
    // Original: new Complex(tiny/0, -tiny/0).asin() = new Complex(Inf, -Inf).asin()
    // Mutated:  new Complex(tiny/0, +tiny/0).asin() = new Complex(Inf, +Inf).asin()
    // These should give different results
    const resultOriginal = new Complex(Infinity, -Infinity).asin();
    expect(result.re).toBeCloseTo(resultOriginal.re, 5);
    expect(result.im).toBeCloseTo(resultOriginal.im, 5);
  });
});