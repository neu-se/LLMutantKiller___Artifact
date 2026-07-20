import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 method", () => {
  it("should correctly compute expm1 for a purely imaginary small number using cosm1", () => {
    // expm1(0 + i*b) = expm1(0)*cos(b) + cosm1(b) + i*exp(0)*sin(b)
    //                = 0*cos(b) + cosm1(b) + i*sin(b)
    //                = (cos(b) - 1) + i*sin(b)
    // For small b (within -π/4 to π/4), cosm1(b) uses the Taylor series polynomial
    // The mutation changes the polynomial evaluation from nested multiplication to division,
    // which will produce a completely different (wrong) value.
    
    const b = 0.1; // small value within the Taylor series range
    const result = new Complex(0, b).expm1();
    
    // Expected: cos(b) - 1 for real part, sin(b) for imaginary part
    const expectedRe = Math.cos(b) - 1;
    const expectedIm = Math.sin(b);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});