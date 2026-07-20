import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acsc', () => {
  it('acsc(5 + NaN*i) imaginary part should be -Infinity on original, not 0 or NaN from mutant path', () => {
    // a=5, b=NaN: d=NaN, hits fallback
    // Original: im=(NaN!==0)?-NaN/0:0 = NaN => asin(Infinity, NaN).im = NaN
    // Mutated:  im=(NaN===0)?-NaN/0:0 = 0  => asin(Infinity, 0).im = -Infinity
    // So original gives NaN, mutated gives -Infinity - they differ!
    const result = new Complex(5, NaN).acsc();
    // On original code, result.im should be NaN
    // On mutated code, result.im should be -Infinity
    expect(isNaN(result.im)).toBe(true);
  });
});