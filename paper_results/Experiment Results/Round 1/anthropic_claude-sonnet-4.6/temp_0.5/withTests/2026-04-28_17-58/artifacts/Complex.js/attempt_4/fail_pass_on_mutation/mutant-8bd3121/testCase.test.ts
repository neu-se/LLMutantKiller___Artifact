import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech function", () => {
  it("should compute asech correctly where the imaginary part affects the result", () => {
    // Test that asech uses the correct imaginary part
    // Create a complex number and verify asech result matches manual calculation
    const c = new Complex(1, 2);
    const result = c.asech();
    
    // Manually compute: asech(1+2i) = acosh(inverse(1+2i))
    // inverse(1+2i) = (1-2i)/5 = 0.2 - 0.4i
    // The result should have specific re and im values
    // If b is wrong (undefined), d = NaN and result = NaN
    
    // Check that result equals acosh of inverse
    const manualResult = new Complex(1, 2).inverse().acosh();
    
    expect(result.re).toBeCloseTo(manualResult.re, 8);
    expect(result.im).toBeCloseTo(manualResult.im, 8);
  });
});