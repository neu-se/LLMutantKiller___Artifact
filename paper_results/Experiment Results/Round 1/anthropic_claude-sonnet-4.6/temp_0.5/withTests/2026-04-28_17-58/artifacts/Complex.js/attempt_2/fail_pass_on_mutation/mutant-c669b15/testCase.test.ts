import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex division", () => {
  it("should correctly handle division of zero by a complex number with equal magnitude real and imaginary parts", () => {
    // Dividing 0 by (1 - i): |c| == |d|, so mutation changes which branch is taken
    // Original (else branch): re = 0 (positive zero)
    // Mutated (if branch): re = -0 (negative zero)
    const result = new Complex(0, 0).div(new Complex(1, -1));
    
    // Check that re is positive zero (not negative zero)
    // 1/0 = Infinity, 1/(-0) = -Infinity
    expect(1 / result.re).toBe(Infinity);
  });
});