import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asech', () => {
  it('asech of purely imaginary number gives correct result', () => {
    // For z = 0 + 2i: asech(2i)
    // Original: a=0, b=2, d=0+4=4, returns Complex(0/4, -2/4).acosh() = Complex(0, -0.5).acosh()
    // Mutated: a=0, b=undefined, d=0+NaN=NaN, returns Complex(NaN, NaN).acosh() = NaN
    const result = new Complex(0, 2).asech();
    expect(Number.isNaN(result.re)).toBe(false);
    expect(Number.isNaN(result.im)).toBe(false);
  });
});