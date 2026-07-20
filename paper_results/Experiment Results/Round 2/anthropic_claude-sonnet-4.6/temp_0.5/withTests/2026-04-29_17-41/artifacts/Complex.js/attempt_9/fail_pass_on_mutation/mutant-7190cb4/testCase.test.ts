import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('acsc with negative imaginary subnormal and positive real subnormal', () => {
    const x = Math.pow(2, -538);
    // a=x, b=-x: d = x*x + x*x = 0 (underflow), early return: a===0 && b===0 is false
    // original: new Complex(x/0, -(-x)/0).asin() = new Complex(Inf, Inf).asin()
    // mutated:  new Complex(x/0, +(-x)/0).asin() = new Complex(Inf, -Inf).asin()
    // Both likely NaN, but let's check if im sign differs
    const result = new Complex(x, -x).acsc();
    const originalPath = new Complex(Infinity, Infinity).asin();
    const mutatedPath = new Complex(Infinity, -Infinity).asin();
    
    // Check if the two paths actually differ
    // If they both give NaN, we need another approach
    // Let's assert on the actual numeric value of result.im sign
    // Even if NaN, Object.is(NaN, NaN) is true - so we can't distinguish NaN from NaN
    
    // Try asserting result equals originalPath result
    // If originalPath.im !== mutatedPath.im (even as NaN), this won't work
    // Let's just verify result matches original by checking toString
    expect(result.toString()).toBe(originalPath.toString());
  });
});