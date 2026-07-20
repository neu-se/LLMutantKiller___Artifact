import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('should return NaN for acot with subnormal inputs causing d to underflow', () => {
    const tiny = Number.MIN_VALUE;
    const c = new Complex(tiny, tiny);
    // d = tiny*tiny + tiny*tiny = 0 (underflow), b != 0 so early return skipped
    // Original: re = tiny/0 = Infinity, im = -tiny/0 = -Infinity -> atan(Inf-Inf*i) = NaN
    // Mutated:  re = 0 (a===0 is false -> 0), im = -Infinity -> atan(0-Inf*i) != NaN
    const result = c.acot();
    expect(result.isNaN()).toBe(true);
  });
});