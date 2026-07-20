import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function via expm1", () => {
  it("should compute expm1 correctly for a complex number with small imaginary part", () => {
    // expm1(0 + 0.1i) = expm1(0)*cos(0.1) + cosm1(0.1) + j*exp(0)*sin(0.1)
    // = 0*cos(0.1) + cosm1(0.1) + j*sin(0.1)
    // = (cos(0.1) - 1) + j*sin(0.1)
    // The mutation changes -1/720 to +1/720 in the Taylor series for cosm1
    // which will produce a wrong real part
    
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    
    // Expected real part: cos(0.1) - 1
    const expectedRe = Math.cos(0.1) - 1;
    const expectedIm = Math.sin(0.1);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});