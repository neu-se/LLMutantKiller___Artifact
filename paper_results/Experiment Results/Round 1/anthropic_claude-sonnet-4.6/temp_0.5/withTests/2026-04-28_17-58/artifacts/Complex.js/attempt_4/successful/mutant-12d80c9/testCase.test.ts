import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech', () => {
  it('asech of Number.MIN_VALUE imaginary part should not equal PI/2', () => {
    const tiny = Number.MIN_VALUE;
    const result = new Complex(tiny, 0).asech();
    // Mutated path gives Complex(0,0).acosh() which has im = PI/2
    // Original path gives Complex(Infinity,0).acosh() which has different im
    expect(result.im).not.toBeCloseTo(Math.PI / 2, 10);
  });
});