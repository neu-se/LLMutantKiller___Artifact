import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects sign mutation via negative tiny imaginary input causing d underflow', () => {
    const tiny = Number.MIN_VALUE;
    // a=0, b=-tiny: d=0 (underflow), early return skipped
    // Original: -b/0 = +Infinity -> asin(0, +Infinity) -> finite
    // Mutated: +b/0 = -Infinity -> asin(0, -Infinity) -> different result
    const result = new Complex(0, -tiny).acsc();
    expect(result.isNaN()).toBe(true);
  });
});