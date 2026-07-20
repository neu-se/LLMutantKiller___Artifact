import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex expm1 with small imaginary part", () => {
  it("should correctly compute expm1 for a purely imaginary number with small argument using accurate cosm1 Taylor series", () => {
    // expm1(0 + 0.1i) = exp(0.1i) - 1
    // = cos(0.1) - 1 + i*sin(0.1)
    // The real part uses cosm1(0.1) which should be cos(0.1) - 1 ≈ -0.0049958347...
    const result = new Complex(0, 0.1).expm1();
    
    const expectedRe = Math.cos(0.1) - 1; // ≈ -0.0049958347219741783
    const expectedIm = Math.sin(0.1);     // ≈ 0.09983341664682815
    
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});