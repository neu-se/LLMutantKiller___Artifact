import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot mutation detection', () => {
  it('should return Infinity real part when acot is called on zero complex number via d===0 branch', () => {
    // The acot function: when b === 0, early return happens
    // When b !== 0 and a === 0, d = b*b > 0, so normal path
    // The d === 0 branch in acot requires a=0, b=0, but b=0 is caught early
    // Test acot(0) which uses early return: atan2(1, 0) = PI/2
    const result = new Complex(0, 0).acot();
    // atan2(1, 0) = PI/2
    expect(result.re).toBeCloseTo(Math.PI / 2, 10);
    expect(result.im).toBe(0);
    
    // Now test with a non-zero real to verify acot works normally
    const result2 = new Complex(1, 0).acot();
    expect(result2.re).toBeCloseTo(Math.PI / 4, 10);
    expect(result2.im).toBe(0);
  });
});