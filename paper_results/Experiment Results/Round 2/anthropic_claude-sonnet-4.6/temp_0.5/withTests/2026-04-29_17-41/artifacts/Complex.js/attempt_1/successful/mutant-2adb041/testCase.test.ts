import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("expm1 with small imaginary part uses cosm1 correctly", () => {
  it("should compute expm1 accurately for small imaginary values, detecting cosm1 coefficient mutation", () => {
    // expm1(0 + 0.1i) = expm1(0)*cos(0.1) + cosm1(0.1) + i*exp(0)*sin(0.1)
    // cosm1(0.1) = cos(0.1) - 1 ≈ -0.004995834722974...
    // The mutation changes 1/87178291200 to 1*87178291200 in the Taylor series,
    // causing cosm1 to return a wildly incorrect value for small x.
    const result = new Complex(0, 0.1).expm1();
    
    const expectedRe = Math.expm1(0) * Math.cos(0.1) + (Math.cos(0.1) - 1);
    const expectedIm = Math.exp(0) * Math.sin(0.1);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});