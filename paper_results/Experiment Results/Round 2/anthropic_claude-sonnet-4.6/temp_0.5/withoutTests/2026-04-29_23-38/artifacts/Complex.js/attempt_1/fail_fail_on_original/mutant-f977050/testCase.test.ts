import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acosh', () => {
  it('should correctly compute acosh for a value where res.im > 0', () => {
    // For acosh, we need a case where res['im'] > 0 (the else branch)
    // acosh(2) should give a real result: log(2 + sqrt(3)) ≈ 1.3169578969248166
    // Let's use a value that exercises the else branch (res['im'] > 0)
    // acosh(-2) = log(-2 + sqrt(4-1)) = log(-2 + sqrt(3)) which has imaginary part
    // We need to find a value where acos gives im > 0
    // acos(x) for x > 1 gives a purely imaginary result with im < 0
    // acos(2) = -i * log(2 + sqrt(3)) so re = 0, im = -log(2+sqrt(3)) < 0
    // That means res['im'] <= 0, so we go to the if branch
    
    // For the else branch (res['im'] > 0), we need acos to return im > 0
    // acos(-2) = pi - acos(2) = pi + i*log(2+sqrt(3)), so im > 0 -> else branch
    
    const result = new Complex(-2, 0).acosh();
    
    // acosh(-2) = log(-2 + sqrt((-2)^2 - 1)) = log(-2 + sqrt(3)) 
    // Using the formula: acosh(x) = i*pi - acosh(-x) for x < -1
    // acosh(-2) = i*pi + acosh(2) ... actually:
    // acosh(-2) = log(-2 + sqrt(4-1)) -- but sqrt(3) < 2, so we need complex log
    // acosh(-2) = log(-2 + i*sqrt(3)) ... no
    // The standard result: acosh(-2) = log(2) + i*pi... let me think
    // acosh(-2) = ln(2) + i*pi... no
    // acosh(-2) = ln(-2 + sqrt(4-1)) = ln(-2 + sqrt(3)) -- sqrt(3) ≈ 1.732
    // That's ln of a negative number... 
    // Actually acosh(-2) = ln(-2 + sqrt(3)) is not right
    // acosh(z) = ln(z + sqrt(z^2 - 1))
    // acosh(-2) = ln(-2 + sqrt(4-1)) = ln(-2 + sqrt(3)) -- sqrt(3) ≈ 1.732, so -2+1.732 = -0.268
    // ln(-0.268) = ln(0.268) + i*pi
    // So re ≈ -1.317, im ≈ pi
    
    // In the original code, the else branch sets:
    //   tmp = res['re']
    //   res['im'] = -res['re']  (original)
    //   res['re'] = tmp
    // In mutated code:
    //   res['im'] = -res[""]  which is -undefined = NaN
    
    expect(result.re).toBeCloseTo(-1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});