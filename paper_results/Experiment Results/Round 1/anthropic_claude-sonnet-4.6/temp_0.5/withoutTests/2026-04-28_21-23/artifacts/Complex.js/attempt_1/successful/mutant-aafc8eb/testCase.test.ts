import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 method", () => {
  it("should correctly compute expm1 for a purely imaginary number close to zero", () => {
    // expm1(i*b) = expm1(0 + i*b)
    // = exp(0)*cos(b) - 1 + i*exp(0)*sin(b)
    // = cos(b) - 1 + i*sin(b)
    // The cosm1 function is used for the real part: expm1(a)*cos(b) + cosm1(b)
    // For a=0, b small: expm1(0)*cos(b) + cosm1(b) = 0*cos(b) + (cos(b)-1) = cos(b)-1
    // The cosm1 function uses the Taylor series for small |x| <= pi/4
    // The mutation changes the Taylor polynomial computation in cosm1
    
    const b = 0.1; // small value within -pi/4 to pi/4 range
    const c = new Complex(0, b);
    const result = c.expm1();
    
    // Expected: real part = cos(0.1) - 1, imaginary part = sin(0.1)
    const expectedRe = Math.cos(b) - 1;
    const expectedIm = Math.sin(b);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});