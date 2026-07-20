import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acosh', () => {
  it('should produce correct real part for acosh(2i) in else branch', () => {
    // acosh(2i) triggers else branch
    // Original else: res.im = -res['re']; res.re = tmp (tmp is from var hoisting = res.re before)
    // Mutated else:  res.im = -res[""] = NaN; res.re = tmp
    // The difference: re is same, but im differs
    // From runs: original gives im = pi/2, re = some value
    // Let's check re is NOT NaN in original but im IS NaN in mutated
    
    const result = new Complex(0, 2).acosh();
    
    // Verify result equals expected complex number by checking cosh(result) = 2i
    // cosh(a+bi) = cosh(a)cos(b) + i*sinh(a)sin(b) should equal 0+2i
    const re = result.re;
    const im = result.im;
    
    const coshRe = Math.cosh(re) * Math.cos(im) - 0; // should be 0
    const coshIm = Math.sinh(re) * Math.sin(im);      // should be 2
    
    expect(coshRe).toBeCloseTo(0, 5);
    expect(coshIm).toBeCloseTo(2, 5);
  });
});