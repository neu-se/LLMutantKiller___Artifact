import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 with small imaginary part", () => {
  it("should correctly compute expm1 for a complex number with small imaginary part using cosm1 Taylor series", () => {
    // expm1(0 + 0.1i) = exp(0)*cos(0.1) - 1 + i*exp(0)*sin(0.1)
    // = cos(0.1) - 1 + i*sin(0.1)
    // cosm1(0.1) = cos(0.1) - 1 ≈ -0.0049958347219741794
    // The mutation changes the Taylor series polynomial evaluation in cosm1,
    // which affects the real part of expm1 for small imaginary values.
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    
    const expectedRe = Math.cos(0.1) - 1; // cosm1(0.1) when a=0
    const expectedIm = Math.sin(0.1);     // exp(0)*sin(0.1)
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});