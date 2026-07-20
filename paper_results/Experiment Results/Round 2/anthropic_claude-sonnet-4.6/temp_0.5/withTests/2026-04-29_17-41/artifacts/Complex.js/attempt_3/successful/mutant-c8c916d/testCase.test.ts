import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc with denormalized input', () => {
  it('should return NaN for extremely small non-zero real input (not zero)', () => {
    const tiny = Number.MIN_VALUE;
    const result = new Complex(tiny, 0).acsc();
    // Original: fallback uses (a !== 0) ? a/0 : 0 = Infinity, asin(Infinity) = NaN
    // Mutated: fallback uses (false) ? a/0 : 0 = 0, asin(0) = 0
    expect(result.isNaN()).toBe(true);
  });
});