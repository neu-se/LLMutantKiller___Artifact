import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acosh', () => {
  it('should return correct re and im for acosh of a complex number triggering else branch', () => {
    // Use acosh(0 + 2i) to trigger the else branch and verify re value changes
    // In original: tmp=res.re; res.im=-res.re; res.re=tmp  (re stays same, im = -old_re)
    // In mutated:  res.im=NaN; res.re=tmp  (re stays same, im = NaN)
    
    const result = new Complex(0, 2).acosh();
    
    // Verify the result is not NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    
    // The real part should be a specific finite value
    // acosh(2i): verify both components are finite and correct
    const re = result.re;
    const im = result.im;
    
    // Reconstruct: cosh(re + i*im) should equal 0 + 2i
    // cosh(a+bi) = cosh(a)cos(b) + i*sinh(a)sin(b)
    expect(Math.cosh(re) * Math.cos(im)).toBeCloseTo(0, 8);
    expect(Math.sinh(re) * Math.sin(im)).toBeCloseTo(2, 8);
  });
});