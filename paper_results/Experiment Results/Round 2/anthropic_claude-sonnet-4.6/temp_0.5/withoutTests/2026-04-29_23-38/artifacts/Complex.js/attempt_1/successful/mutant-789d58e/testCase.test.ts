import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 function", () => {
  it("should correctly compute expm1 for small imaginary values using cosm1", () => {
    // The mutation affects the cosm1 function which is used in expm1
    // cosm1(x) computes cos(x) - 1 for small x using Taylor series
    // The mutation changes `+ 1/479001600` to `- 1*479001600` which drastically changes the result
    
    // For a purely imaginary number z = i*b where b is small,
    // expm1(i*b) = exp(0)*cos(b) - 1 + i*exp(0)*sin(b)
    //           = cos(b) - 1 + i*sin(b)
    //           = cosm1(b) + i*sin(b)
    
    // Use a small value of b to trigger the Taylor series path in cosm1
    // (b must be within [-pi/4, pi/4])
    const b = 0.1;
    const z = new Complex(0, b);
    const result = z.expm1();
    
    // Expected: cos(0.1) - 1 ≈ -0.004995834721974977
    const expectedRe = Math.cos(b) - 1;
    const expectedIm = Math.sin(b);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});