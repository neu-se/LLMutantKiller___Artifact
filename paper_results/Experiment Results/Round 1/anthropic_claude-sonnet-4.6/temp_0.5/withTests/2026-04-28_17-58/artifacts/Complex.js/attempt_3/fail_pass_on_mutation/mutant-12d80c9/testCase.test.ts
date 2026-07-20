import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech', () => {
  it('asech of Number.MIN_VALUE should differ from asech of zero due to underflow in d', () => {
    // Number.MIN_VALUE^2 underflows to 0, so d=0 but a !== 0
    // Original: new Complex(Infinity, 0).acosh() => re = Infinity
    // Mutated:  new Complex(0, 0).acosh()        => re = 0
    const tiny = Number.MIN_VALUE;
    const result = new Complex(tiny, 0).asech();
    const resultZero = new Complex(0, 0).asech(); // returns INFINITY sentinel
    // The original should NOT equal the zero result
    expect(result.re).not.toBe(resultZero.re);
  });
});