import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acosh', () => {
  it('should correctly compute acosh for a value with negative real part triggering the else branch', () => {
    // acosh(-2): acos(-2) has im > 0, so the else branch executes
    // Original else branch:
    //   tmp = res['re']
    //   res['im'] = -res['re']  <- original
    //   res['re'] = tmp
    // Mutated else branch:
    //   res['im'] = -res[""]  <- NaN
    //   res['re'] = tmp
    
    const result = new Complex(-2, 0).acosh();
    
    // The imaginary part should be finite (not NaN) in the original code
    expect(isNaN(result.im)).toBe(false);
    // The imaginary part should be approximately pi
    expect(result.im).toBeCloseTo(Math.PI, 10);
    // The real part should be approximately log(2 + sqrt(3))
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(3)), 10);
  });
});