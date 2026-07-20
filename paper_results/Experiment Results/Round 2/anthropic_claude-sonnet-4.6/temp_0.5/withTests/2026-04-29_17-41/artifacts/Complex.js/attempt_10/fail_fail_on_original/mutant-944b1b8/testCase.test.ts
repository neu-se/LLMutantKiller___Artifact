import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('asec', () => {
  it('asec of purely imaginary tiny number should give finite real part', () => {
    const tiny = Number.MIN_VALUE;
    const result = new Complex(0, tiny).asec();
    // Original: d = tiny*tiny = 0 (underflow), a=0 so re=0, im=-Infinity -> acos(0,-Inf)
    // Mutated: re=NaN, im=-Infinity -> acos(NaN,-Inf) -> NaN result
    expect(isNaN(result.re)).toBe(false);
  });
});