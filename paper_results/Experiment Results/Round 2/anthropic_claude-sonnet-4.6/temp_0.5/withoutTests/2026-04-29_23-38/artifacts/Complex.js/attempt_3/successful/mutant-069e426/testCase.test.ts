import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('returns NaN for extremely small non-zero real input where d underflows to 0', () => {
    const c = new Complex(Number.MIN_VALUE, 0);
    const result = c.asec();
    // Original: (a !== 0) ? a/0 : 0 => Infinity => new Complex(Infinity, 0).acos() => NaN
    // Mutated: (a === 0) ? a/0 : 0 => 0 => new Complex(0, 0).acos() => ~PI/2 (finite)
    expect(result.isNaN()).toBe(true);
  });
});