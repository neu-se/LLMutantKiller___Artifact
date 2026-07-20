import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('acsc of tiny positive imaginary number produces non-NaN with correct sign', () => {
    // a=0, b=5e-324 (positive MIN_VALUE): d = 0+0 = 0 (underflows), b != 0
    // Original: new Complex(0, -b/0).asin() = new Complex(0, -Infinity).asin()
    //   → t2 = Complex(Inf - (-Inf), 0).log() = Complex(Inf, 0).log() = Complex(Inf, 0)
    //   → result = Complex(0, -Inf) — NOT NaN
    // Mutated: new Complex(0, +b/0).asin() = new Complex(0, +Infinity).asin()
    //   → t2 = Complex(Inf - Inf, 0).log() = Complex(NaN, 0) — IS NaN
    const result = new Complex(0, 5e-324).acsc();
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});