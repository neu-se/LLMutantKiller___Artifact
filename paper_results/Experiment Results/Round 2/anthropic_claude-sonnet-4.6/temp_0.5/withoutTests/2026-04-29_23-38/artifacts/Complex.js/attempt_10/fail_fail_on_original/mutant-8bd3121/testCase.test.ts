import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should compute asech with correct imaginary part for complex input", () => {
    // For asech(3+4i): d=25, result of acosh(3/25 - 4i/25) = acosh(0.12 - 0.16i)
    const c = new Complex(3, 4);
    const result = c.asech();
    
    // Get the actual value from original to use as reference
    // Original: re ≈ 0.16044553377450485 (from previous test output)
    expect(result.re).toBeCloseTo(0.16044553377450485, 5);
    // The imaginary part should be specific - in mutant b=undefined so -b/d=NaN
    // meaning acosh receives NaN imaginary part
    expect(result.im).toBeCloseTo(-1.3497776911720127, 5);
  });
});