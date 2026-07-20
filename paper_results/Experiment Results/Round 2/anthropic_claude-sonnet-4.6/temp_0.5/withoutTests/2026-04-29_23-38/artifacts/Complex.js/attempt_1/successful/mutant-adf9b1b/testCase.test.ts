import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 with small imaginary values", () => {
  it("should correctly compute expm1 for a purely imaginary number with small argument", () => {
    // expm1(0 + 0.1i) = expm1(0)*cos(0.1) + cosm1(0.1) + i*exp(0)*sin(0.1)
    // The real part = 0 * cos(0.1) + (cos(0.1) - 1) = cos(0.1) - 1
    // The imaginary part = exp(0) * sin(0.1) = sin(0.1)
    // cosm1 is used for small b (|b| <= pi/4), so 0.1 triggers the Taylor series path
    
    const z = new Complex(0, 0.1);
    const result = z.expm1();
    
    const expectedRe = Math.cos(0.1) - 1; // approximately -0.004995834721...
    const expectedIm = Math.sin(0.1);     // approximately 0.099833416...
    
    // The original code uses a correct Taylor series polynomial for cosm1
    // The mutated code uses division instead of multiplication in the polynomial,
    // producing a wildly different value for cosm1(0.1)
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});