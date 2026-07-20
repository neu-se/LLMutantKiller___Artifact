import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('detects mutation in asec else branch via subnormal b causing d underflow', () => {
    // With b = 5e-324: b !== 0, but b*b = 0 (underflow), so d = 0
    // Bypasses early return (which requires a===0 && b===0)
    // Goes to else branch
    // Original: Complex(0, -b/0) = Complex(0, -Infinity) then .acos()
    // Mutated:  Complex(0, +b/0) = Complex(0, +Infinity) then .acos()
    const b = 5e-324;
    const result = new Complex(0, b).asec();
    const originalElsePath = new Complex(0, -Infinity).acos();
    
    // Both should have same re value
    if (isNaN(originalElsePath.re)) {
      expect(isNaN(result.re)).toBe(true);
    } else {
      expect(result.re).toBeCloseTo(originalElsePath.re, 10);
    }
    if (isNaN(originalElsePath.im)) {
      expect(isNaN(result.im)).toBe(true);
    } else {
      expect(result.im).toBeCloseTo(originalElsePath.im, 10);
    }
  });
});