import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 function", () => {
  it("should compute expm1 accurately for small imaginary values using cosm1", () => {
    // The mutation affects the cosm1 function which is used in expm1
    // cosm1(x) computes cos(x) - 1 using Taylor series for small x
    // The mutation changes `+ 1/479001600` to `- 1/3628800` (wrong sign and coefficient)
    // We test expm1 with a pure imaginary number where a=0, b is small
    // expm1(0 + i*b) = expm1(0)*cos(b) + cosm1(b) + i*exp(0)*sin(b)
    //                = 0*cos(b) + cosm1(b) + i*sin(b)
    //                = cosm1(b) + i*sin(b)
    //                = (cos(b) - 1) + i*sin(b)
    
    // Use a small value of b within the range where Taylor series is used (|b| <= pi/4)
    const b = 0.1;
    const result = new Complex(0, b).expm1();
    
    // Expected: cos(b) - 1 + i*sin(b)
    const expectedRe = Math.cos(b) - 1;
    const expectedIm = Math.sin(b);
    
    expect(result.re).toBeCloseTo(expectedRe, 12);
    expect(result.im).toBeCloseTo(expectedIm, 12);
  });
});