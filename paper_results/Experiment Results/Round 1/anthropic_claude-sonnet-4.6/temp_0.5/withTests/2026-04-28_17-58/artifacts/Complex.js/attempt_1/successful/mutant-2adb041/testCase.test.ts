import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("expm1 with small imaginary part uses cosm1 correctly", () => {
  it("should compute expm1 accurately for a complex number with small imaginary part", () => {
    // expm1(0 + 0.1i) = exp(0)*cos(0.1) - 1 + i*exp(0)*sin(0.1)
    // = cos(0.1) - 1 + i*sin(0.1)
    // cosm1(0.1) = cos(0.1) - 1 ≈ -0.0049958347219741794
    // The mutation changes the Taylor series coefficient from -1/87178291200 to -1*87178291200
    // which would produce a wildly incorrect result for small arguments
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    
    const expectedRe = Math.cos(0.1) - 1; // ≈ -0.0049958347219741794
    const expectedIm = Math.sin(0.1);     // ≈ 0.09983341664682815
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});