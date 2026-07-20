import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot with b exactly 3000", () => {
  it("should compute abs correctly when imaginary part is exactly 3000", () => {
    // When a=1 (small) and b=3000:
    // Original: a < 3000 && b < 3000 => false (b is not < 3000), uses stable formula
    // Mutated: a < 3000 && b <= 3000 => true, uses simple formula
    // Both should give same result here, so let's find a case that differs
    
    // Use a=0, b=3000: abs should be exactly 3000
    const c = new Complex(0, 3000);
    const result = c.abs();
    expect(result).toBe(3000);
  });
});