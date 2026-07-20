import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 via expm1", () => {
  it("should compute expm1 accurately for small imaginary values using correct cosm1 Taylor series", () => {
    // expm1(0 + 0.1i) = expm1(0)*cos(0.1) + cosm1(0.1) + i*exp(0)*sin(0.1)
    // real part = 0 + cosm1(0.1) = cos(0.1) - 1
    // The cosm1 function uses a Taylor series for |x| <= pi/4
    // The mutation changes the polynomial from Horner form to a division,
    // producing a completely different result
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    
    // cos(0.1) - 1 ≈ -0.0049958347219741626
    const expectedRe = Math.cos(0.1) - 1;
    
    // The real part should be very close to cos(0.1) - 1
    expect(Math.abs(result.re - expectedRe)).toBeLessThan(1e-12);
    
    // The imaginary part should be sin(0.1)
    const expectedIm = Math.sin(0.1);
    expect(Math.abs(result.im - expectedIm)).toBeLessThan(1e-12);
  });
});