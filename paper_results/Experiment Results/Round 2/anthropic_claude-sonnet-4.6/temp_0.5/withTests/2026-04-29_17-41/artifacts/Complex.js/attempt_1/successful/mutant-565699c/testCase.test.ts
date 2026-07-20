import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function via expm1", () => {
  it("should correctly compute expm1 for a small imaginary value, exposing the cosm1 mutation", () => {
    // expm1(0 + 0.1i) = exp(0)*cos(0.1) - 1 + i*exp(0)*sin(0.1)
    // real part = cos(0.1) - 1 = cosm1(0.1) ≈ -0.004995834721...
    // The mutation changes division to multiplication in the Taylor series,
    // which produces a wildly incorrect result for small angles.
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    
    const expectedRe = Math.cos(0.1) - 1; // ≈ -0.004995834721...
    const expectedIm = Math.sin(0.1);     // ≈ 0.09983341664...
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});