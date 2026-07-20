import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acsc', () => {
  it('asin of Infinity+0i has non-NaN imaginary part while asin of Infinity+NaN*i has NaN imaginary part', () => {
    const originalPath = new Complex(Infinity, NaN).asin();
    const mutatedPath = new Complex(Infinity, 0).asin();
    // These should differ - if they don't, we need a different input
    // For a=5, b=NaN: original uses asin(Inf, NaN), mutated uses asin(Inf, 0)
    const result5NaN = new Complex(5, NaN).acsc();
    // On mutated code: result equals mutatedPath result
    // On original code: result equals originalPath result  
    expect(isNaN(result5NaN.im)).toBe(isNaN(originalPath.im));
    expect(isNaN(result5NaN.re)).toBe(isNaN(originalPath.re));
  });
});