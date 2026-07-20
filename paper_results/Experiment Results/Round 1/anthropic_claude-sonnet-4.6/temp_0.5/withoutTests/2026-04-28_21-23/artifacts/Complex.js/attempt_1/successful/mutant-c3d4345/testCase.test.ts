import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return Complex(0, Infinity) only when both re and im are 0, not when only re is non-zero and im is 0", () => {
    // With the mutation `if (true && b === 0)`, any complex number with im === 0
    // will return Complex(0, Infinity), which is wrong.
    // The original code only returns Complex(0, Infinity) when a === 0 && b === 0.
    
    // Test with a real number (a=2, b=0): original returns acos(1/2), mutation returns Complex(0, Infinity)
    const result = new Complex(2, 0).asec();
    
    // asec(2) = acos(1/2) = PI/3 ≈ 1.0472...
    // The result should NOT be Complex(0, Infinity)
    expect(result.re).toBeCloseTo(Math.PI / 3, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});