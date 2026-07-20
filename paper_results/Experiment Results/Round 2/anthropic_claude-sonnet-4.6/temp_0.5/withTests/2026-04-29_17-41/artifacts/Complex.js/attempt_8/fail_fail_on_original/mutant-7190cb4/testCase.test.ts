import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsc', () => {
  it('detects sign mutation using input where d underflows to zero', () => {
    // Find a value where x*x === 0 (underflows)
    // 2^-538 * 2^-538 = 2^-1076 which underflows (min exponent is -1074)
    // 2^-538 ≈ 1.4e-162
    const x = Math.pow(2, -538);
    // Verify underflow
    // x*x should be 0
    
    // a=0, b=x: d = x*x + 0 = 0 (underflows)
    // original: new Complex(0, -x/0).asin() = new Complex(0, -Inf).asin()
    // mutated:  new Complex(0, +x/0).asin() = new Complex(0, +Inf).asin()
    const result = new Complex(0, x).acsc();
    
    // asin(0, -Inf) should give (0, -Inf) based on formula
    // asin(0, +Inf) should give NaN (Inf - Inf in t2 computation)
    // So original gives non-NaN, mutated gives NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});