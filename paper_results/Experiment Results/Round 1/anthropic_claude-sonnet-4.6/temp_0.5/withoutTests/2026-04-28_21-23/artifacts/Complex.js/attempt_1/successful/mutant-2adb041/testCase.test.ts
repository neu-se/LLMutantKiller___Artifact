import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 method using cosm1 function", () => {
  it("should compute expm1 accurately for small imaginary values where cosm1 Taylor series is used", () => {
    // The mutation changes a coefficient in the cosm1 Taylor series from
    // `/ 87178291200` to `* 87178291200`, which drastically alters the result
    // for small x values (where the Taylor series is used, i.e., |x| <= π/4)
    
    // expm1(0 + i*b) = exp(0)*cos(b) - 1 + i*exp(0)*sin(b)
    //                = cos(b) - 1 + i*sin(b)
    // The cosm1 function computes cos(b) - 1 using Taylor series for small b
    
    // Use a small imaginary value to trigger the Taylor series path in cosm1
    const smallAngle = 0.1; // |0.1| < π/4 ≈ 0.785, so Taylor series is used
    
    const c = new Complex(0, smallAngle);
    const result = c.expm1();
    
    // Expected: expm1(i*0.1) = cos(0.1) - 1 + i*sin(0.1)
    const expectedRe = Math.cos(smallAngle) - 1; // approximately -0.004995834721...
    const expectedIm = Math.sin(smallAngle);     // approximately 0.09983341664...
    
    // The mutation would produce a wildly incorrect real part due to the
    // coefficient change from division to multiplication
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});