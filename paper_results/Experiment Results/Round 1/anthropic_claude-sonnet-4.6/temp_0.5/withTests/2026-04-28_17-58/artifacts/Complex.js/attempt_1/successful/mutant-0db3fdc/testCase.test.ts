import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 via expm1 with small imaginary argument", () => {
  it("should correctly compute expm1 for a purely imaginary number with small imaginary part", () => {
    // expm1(0 + 0.1i) = expm1(0)*cos(0.1) + cosm1(0.1) + i*exp(0)*sin(0.1)
    // real part = cosm1(0.1) = cos(0.1) - 1
    // The cosm1 function uses Taylor series for |x| <= pi/4
    // The mutation changes the Taylor series computation, producing wrong results
    const b = 0.1;
    const result = new Complex(0, b).expm1();
    
    // Expected real part: cos(0.1) - 1
    const expectedRe = Math.cos(b) - 1;
    // Expected imaginary part: sin(0.1)
    const expectedIm = Math.sin(b);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});