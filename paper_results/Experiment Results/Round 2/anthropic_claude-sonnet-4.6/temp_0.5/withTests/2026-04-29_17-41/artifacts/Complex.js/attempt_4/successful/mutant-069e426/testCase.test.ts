import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('detects mutation in asec d===0 fallback using underflow of tiny nonzero value', () => {
    // Number.MIN_VALUE squared underflows to 0, bypassing early return (a !== 0)
    // but hitting the d===0 fallback branch
    // Original: (a !== 0) ? a/0 : 0 => Infinity => acos(Infinity, 0) => NaN
    // Mutated:  (a === 0) ? a/0 : 0 => 0        => acos(0, 0) => pi/2
    const tiny = Number.MIN_VALUE;
    const result = new Complex(tiny, 0).asec();
    // On original code: result is NaN (from acos(Infinity))
    // On mutated code: result.re is pi/2
    expect(result.isNaN()).toBe(true);
  });
});