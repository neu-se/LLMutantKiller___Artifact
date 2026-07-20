import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1", () => {
  it("should correctly compute expm1 for a small imaginary value using cosm1", () => {
    // expm1(0 + i*b) = expm1(0)*cos(b) + cosm1(b) + i*exp(0)*sin(b)
    //                = 0*cos(b) + cosm1(b) + i*sin(b)
    //                = cosm1(b) + i*sin(b)
    // where cosm1(b) = cos(b) - 1
    // For small b (within -PI/4 to PI/4), cosm1 uses the Taylor series polynomial
    // The mutation changes the Taylor series computation, so the result will differ
    
    const b = 0.1; // small value within the Taylor series range
    const result = new Complex(0, b).expm1();
    
    // Expected: cosm1(b) = cos(b) - 1, sin(b)
    const expectedRe = Math.cos(b) - 1;
    const expectedIm = Math.sin(b);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});