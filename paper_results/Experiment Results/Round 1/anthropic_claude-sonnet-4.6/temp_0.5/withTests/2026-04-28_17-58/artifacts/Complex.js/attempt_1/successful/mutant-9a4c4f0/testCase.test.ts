import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("cosm1 function via expm1", () => {
  it("should compute expm1 correctly for a purely imaginary number near zero", () => {
    // expm1(0 + i*b) = expm1(0)*cos(b) + cosm1(b) + i*exp(0)*sin(b)
    // = 0*cos(b) + cosm1(b) + i*sin(b)
    // = cosm1(b) + i*sin(b)
    // where cosm1(b) = cos(b) - 1
    //
    // For b = 0.1 (small value within -pi/4 to pi/4), cosm1 uses Taylor series
    // The mutation changes the polynomial evaluation, producing a wrong result
    
    const b = 0.1;
    const c = new Complex(0, b);
    const result = c.expm1();
    
    // Expected: re = cos(0.1) - 1, im = sin(0.1)
    const expectedRe = Math.cos(b) - 1;
    const expectedIm = Math.sin(b);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});