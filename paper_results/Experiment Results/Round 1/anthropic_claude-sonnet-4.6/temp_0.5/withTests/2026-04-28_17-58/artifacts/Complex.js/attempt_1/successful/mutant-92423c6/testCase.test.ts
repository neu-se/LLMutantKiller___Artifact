import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("expm1 with small imaginary part uses cosm1 correctly", () => {
  it("should compute expm1 of a purely imaginary number accurately using correct cosm1 Taylor series", () => {
    // For Complex(0, b).expm1(), the real part equals cosm1(b) = cos(b) - 1
    // The cosm1 function uses a Taylor series for small b (|b| <= pi/4)
    // The mutation changes + 1/40320 to - 1/40320 in the Taylor series
    // This affects the result for small imaginary values
    
    const b = 0.1;
    const result = new Complex(0, b).expm1();
    
    // The expected real part is cos(0.1) - 1
    const expected = Math.cos(b) - 1;
    
    // The original code should match Math.cos(b) - 1 very closely
    // The mutated code will have an error of about 2 * (b^8 / 40320) ≈ 4.96e-13
    expect(result.re).toBeCloseTo(expected, 12);
    
    // More precise check: the difference should be within 1e-14
    const diff = Math.abs(result.re - expected);
    expect(diff).toBeLessThan(1e-13);
  });
});