import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech', () => {
  it('detects mutation with tiny negative imaginary part causing d underflow', () => {
    // a=5e-200, b=-5e-200: d underflows to 0, isZero() false
    // Original: new Complex(Infinity, -(-5e-200)/0) = new Complex(Infinity, Infinity).acosh()
    // Mutated:  new Complex(Infinity, 0).acosh()
    const c = new Complex(5e-200, -5e-200);
    const result = c.asech();
    const mutatedExpected = new Complex(Infinity, 0).acosh();
    
    // Check if result differs from mutated expectation
    const matchesMutated = 
      (isNaN(result.re) === isNaN(mutatedExpected.re)) &&
      (isNaN(result.im) === isNaN(mutatedExpected.im)) &&
      (isNaN(result.re) || Math.abs(result.re - mutatedExpected.re) < 1e-10) &&
      (isNaN(result.im) || Math.abs(result.im - mutatedExpected.im) < 1e-10);
    
    expect(matchesMutated).toBe(false);
  });
});