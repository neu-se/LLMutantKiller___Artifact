import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should produce correct string representation for complex number with b just above zero', () => {
    // Test the boundary: b = Number.MIN_VALUE (smallest positive number)
    // This is > 0 so b < 0 and b <= 0 both false - same result
    // But b = -Number.MIN_VALUE: b < 0 true, b <= 0 true - same result  
    // Only b = 0 differs, but early return catches it
    // Let's test b = 0 reached via a computation
    const c = new Complex(0, Math.sin(0)); // Math.sin(0) = 0
    expect(c.toString()).toBe('0');
  });
});