import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 with small imaginary part", () => {
  it("should correctly compute expm1 for a complex number with small imaginary part", () => {
    // expm1(0 + 0.1i) uses cosm1(0.1) internally
    // cosm1(0.1) = cos(0.1) - 1 ≈ -0.004995834721...
    // The mutation changes the Taylor series computation drastically
    const z = new Complex(0, 0.1);
    const result = z.expm1();
    
    // expm1(0 + 0.1i) = expm1(0)*cos(0.1) + cosm1(0.1) + i*exp(0)*sin(0.1)
    // = 0 * cos(0.1) + (cos(0.1) - 1) + i * sin(0.1)
    // re = cos(0.1) - 1 ≈ -0.004995834721...
    // im = sin(0.1) ≈ 0.09983341664...
    
    const expectedRe = Math.cos(0.1) - 1; // ≈ -0.004995834721...
    const expectedIm = Math.sin(0.1);     // ≈ 0.09983341664...
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});