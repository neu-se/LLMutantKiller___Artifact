import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects sign mutation: with positive tiny imaginary, original gives non-NaN, mutated gives NaN', () => {
    const tiny = Number.MIN_VALUE;
    // a=0, b=tiny>0: d=0 (underflow), bypasses early return
    // Original: -b/0 = -Infinity -> asin(0, -Infinity) -> (0, -Infinity) non-NaN
    // Mutated: +b/0 = +Infinity -> asin(0, +Infinity) -> NaN
    const result = new Complex(0, tiny).acsc();
    expect(result.isNaN()).toBe(false);
  });
});