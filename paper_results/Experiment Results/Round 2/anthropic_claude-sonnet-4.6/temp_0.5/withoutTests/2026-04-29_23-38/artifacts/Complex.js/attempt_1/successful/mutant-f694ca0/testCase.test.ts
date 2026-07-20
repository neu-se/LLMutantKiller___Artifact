import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 function", () => {
  it("should correctly compute expm1 for a small real number using cosm1 internally", () => {
    // The mutation affects the cosm1 function which is used by expm1
    // cosm1(x) computes cos(x) - 1 using Taylor series for small x
    // The mutation changes `- 1 / 3628800` to `- 1 * 3628800` in the polynomial
    // This would produce wildly incorrect results for small imaginary parts
    
    // expm1(a + ib) = expm1(a)*cos(b) + cosm1(b) + i*exp(a)*sin(b)
    // For a=0, b=0.1 (small value within [-π/4, π/4]):
    // cosm1(0.1) = cos(0.1) - 1 ≈ -0.0049958347...
    
    // With the mutation, the polynomial coefficient changes dramatically
    // causing cosm1 to return a very different value
    
    const c = new Complex(0, 0.1);
    const result = c.expm1();
    
    // cos(0.1) - 1 ≈ -0.004995834721974977
    // exp(0) * sin(0.1) ≈ 0.09983341664682815
    // expm1(0) * cos(0.1) = 0
    // So re ≈ -0.004995834721974977, im ≈ 0.09983341664682815
    
    const expectedRe = Math.expm1(0) * Math.cos(0.1) + (Math.cos(0.1) - 1);
    const expectedIm = Math.exp(0) * Math.sin(0.1);
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});