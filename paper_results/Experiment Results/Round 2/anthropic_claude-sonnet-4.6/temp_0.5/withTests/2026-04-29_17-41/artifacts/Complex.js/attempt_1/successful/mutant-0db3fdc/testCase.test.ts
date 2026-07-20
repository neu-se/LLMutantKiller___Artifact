import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function via expm1", () => {
  it("should compute expm1 of a small imaginary number accurately", () => {
    // expm1(0 + 0.1i) = expm1(0)*cos(0.1) + cosm1(0.1) + i*exp(0)*sin(0.1)
    // Real part = cosm1(0.1) = cos(0.1) - 1 ≈ -0.0049958347219741794
    // The mutation changes cosm1's polynomial evaluation, producing a wrong result
    const result = new Complex(0, 0.1).expm1();
    
    // The expected real part is cos(0.1) - 1
    const expectedRe = Math.cos(0.1) - 1;
    const expectedIm = Math.sin(0.1);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});