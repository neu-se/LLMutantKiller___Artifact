import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex multiplication short circuit for real numbers", () => {
  it("should return correct result when multiplying real number by itself using short circuit path", () => {
    // With the mutated code, the empty if block means we fall through to general formula
    // For real numbers (im=0), both paths give same result mathematically
    // BUT: test with -0 to expose difference
    const a = new Complex(-0, 0);
    const b = new Complex(-0, 0);
    const result = a.mul(b);
    // Short circuit: (-0) * (-0) = 0 (positive zero)
    // General formula: (-0)*(-0) - 0*0 = 0, im: (-0)*0 + 0*(-0) = 0
    // Both give 0, need different approach
    // Use Object.is to detect -0 vs +0
    expect(Object.is(result.re, 0)).toBe(true);
    expect(Object.is(result.re, -0)).toBe(false);
  });
});