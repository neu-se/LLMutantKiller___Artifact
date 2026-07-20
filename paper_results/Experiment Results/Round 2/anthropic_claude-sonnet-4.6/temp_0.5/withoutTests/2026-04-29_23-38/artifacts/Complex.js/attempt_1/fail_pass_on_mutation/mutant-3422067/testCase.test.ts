import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot with equal large values", () => {
  it("should correctly compute abs() when both real and imaginary parts are equal and large", () => {
    // When both components are equal and large (>= 3000), the hypot function
    // takes a different code path. With a === b:
    // Original (a < b): goes to else branch, b = y/x
    // Mutated (a <= b): goes to if branch, a = b, b = x/y
    // When a === b and both are large, x/y = y/x = 1, so both give same result.
    // But we need a case where a === b but x != y in sign... 
    // Actually let's test with a = b = 4000 (both positive), expected = 4000*sqrt(2)
    const c = new Complex(4000, 4000);
    const result = c.abs();
    const expected = Math.sqrt(4000 * 4000 + 4000 * 4000);
    expect(result).toBeCloseTo(expected, 10);
    
    // More specifically, verify the exact value
    expect(Math.abs(result - expected)).toBeLessThan(1e-6);
  });
});