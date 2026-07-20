import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function via expm1", () => {
  it("should compute expm1 correctly for small imaginary values, detecting cosm1 mutation", () => {
    // expm1(a + ib) uses cosm1(b) internally
    // cosm1(x) for small x should return cos(x) - 1
    // The mutation changes `- 1 / 3628800` to `- 1 * 3628800` in the Taylor series
    // This will produce wildly incorrect results for small x values within [-π/4, π/4]
    
    // Use a purely imaginary input: expm1(0 + i*b) = cosm1(b) + i*sin(b)
    // For b = 0.1 (small, within [-π/4, π/4]):
    // cosm1(0.1) = cos(0.1) - 1 ≈ -0.004995834721...
    // The real part of expm1(0 + 0.1i) = expm1(0)*cos(0.1) + cosm1(0.1)
    //                                   = 0 * cos(0.1) + cosm1(0.1)
    //                                   = cosm1(0.1)
    
    const b = 0.1;
    const result = new Complex(0, b).expm1();
    
    // Expected: cosm1(0.1) = cos(0.1) - 1
    const expectedRe = Math.cos(b) - 1;
    const expectedIm = Math.exp(0) * Math.sin(b); // = sin(0.1)
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});