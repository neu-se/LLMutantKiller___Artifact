import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 with small imaginary values", () => {
  it("should correctly compute expm1 for a complex number with small imaginary part using cosm1", () => {
    // The mutation changes the cosm1 function's Taylor series coefficient
    // Original: - 1 / 87178291200 (correct Taylor series for cos(x)-1)
    // Mutated:  - 1 * 87178291200 (wildly incorrect coefficient)
    // 
    // cosm1 is used in expm1: exp(a+ib) - 1 = expm1(a)*cos(b) + cosm1(b) + j*exp(a)*sin(b)
    // For small b values (within ±π/4), the Taylor series path is taken
    // We use a=0, b=0.1 to isolate the cosm1 behavior
    
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    
    // Expected: expm1(0)*cos(0.1) + cosm1(0.1) + i*exp(0)*sin(0.1)
    // = 0*cos(0.1) + (cos(0.1) - 1) + i*sin(0.1)
    // = cos(0.1) - 1 + i*sin(0.1)
    const expectedRe = Math.cos(0.1) - 1;
    const expectedIm = Math.sin(0.1);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});