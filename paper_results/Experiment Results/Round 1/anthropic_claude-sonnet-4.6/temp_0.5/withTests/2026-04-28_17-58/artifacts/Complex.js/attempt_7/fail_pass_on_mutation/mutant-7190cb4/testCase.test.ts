import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects sign mutation: original produces NaN, mutated produces non-NaN result', () => {
    const tiny = Number.MIN_VALUE;
    // a=0, b=-tiny: d=0 (underflow), bypasses early return
    // Original: -b/0 = +Infinity -> asin(0, +Infinity) -> NaN
    // Mutated: +b/0 = -Infinity -> asin(0, -Infinity) -> (0, -Infinity)
    const result = new Complex(0, -tiny).acsc();
    expect(result.isNaN()).toBe(true);
  });
});