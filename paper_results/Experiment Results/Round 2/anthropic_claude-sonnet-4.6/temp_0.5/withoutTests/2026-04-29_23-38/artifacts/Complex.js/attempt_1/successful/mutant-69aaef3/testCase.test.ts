import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs() with large values", () => {
  it("should correctly compute the absolute value of a complex number with large components", () => {
    // The hypot function is used when a >= 3000 or b >= 3000
    // In the original: return a * Math.sqrt(1 + b * b)  where b = y/x (or x/y)
    // In the mutant:   return a * Math.sqrt(1 + b / b) = a * Math.sqrt(2)
    // We need a case where a >= b >= 3000 so that b = y/x < 1 and the mutation is detectable
    
    // Use re=4000, im=3000: a=4000, b=3000, a>=b so b_ratio = 3000/4000 = 0.75
    // Original: 4000 * sqrt(1 + 0.75*0.75) = 4000 * sqrt(1.5625) = 4000 * 1.25 = 5000
    // Mutant:   4000 * sqrt(1 + 0.75/0.75) = 4000 * sqrt(2) ≈ 5656.85
    
    const c = new Complex(4000, 3000);
    const result = c.abs();
    
    expect(result).toBeCloseTo(5000, 5);
  });
});