import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 function", () => {
  it("should correctly compute expm1 for a purely imaginary number with small imaginary part", () => {
    // The mutation affects cosm1(b), which is used in expm1
    // cosm1(x) computes cos(x) - 1 using Taylor series for small x
    // The mutation changes xx / 20922789888000 to xx * 20922789888000
    // This will produce wildly incorrect results for small angles
    
    // Use a small imaginary value where cosm1 Taylor series is used (|x| <= pi/4)
    // For purely real input a=0, b=0.1:
    // expm1(0 + 0.1i) = expm1(0)*cos(0.1) + cosm1(0.1) + i*exp(0)*sin(0.1)
    // = 0*cos(0.1) + cosm1(0.1) + i*sin(0.1)
    // = cosm1(0.1) + i*sin(0.1)
    // cosm1(0.1) = cos(0.1) - 1 ≈ -0.004995834721974...
    
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    
    // The real part should be cos(0.1) - 1 ≈ -0.004995834721974
    const expectedRe = Math.cos(0.1) - 1;
    const expectedIm = Math.sin(0.1);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});