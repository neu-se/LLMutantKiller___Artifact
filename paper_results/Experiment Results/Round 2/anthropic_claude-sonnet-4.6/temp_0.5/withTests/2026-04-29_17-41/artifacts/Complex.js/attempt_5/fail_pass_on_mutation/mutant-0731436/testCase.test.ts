import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe("Complex asec", () => {
  it("detects mutation in asec dead branch via subnormal underflow", () => {
    // Force d=0 with non-zero b using the smallest possible float
    // In IEEE 754: Number.MIN_VALUE = 2^-1074, (2^-1074)^2 = 2^-2148 = 0
    const a = Number.MIN_VALUE;
    const b = Number.MIN_VALUE;
    
    // If d underflows to 0 (b !== 0 branch matters):
    // Original: new Complex(0, -Infinity).acos() -> NaN (due to 0*Infinity)
    // Mutated:  new Complex(0, 0).acos() -> (π/2, 0)
    
    // If d does NOT underflow (d !== 0 branch):
    // Both give same result, test is inconclusive
    
    const d = a * a + b * b;
    const c = new Complex(a, b);
    const result = c.asec();
    
    if (d === 0) {
      // Original path produces NaN, mutated produces (π/2, 0)
      expect(isNaN(result.re)).toBe(true);
    } else {
      // Both paths identical, just verify it's a valid number
      expect(isFinite(result.re) || isNaN(result.re)).toBe(true);
    }
  });
});