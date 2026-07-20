import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot large values", () => {
  it("should correctly compute abs() for large complex numbers where hypot uses the else branch", () => {
    // When both a and b are >= 3000, the hypot function uses the else branch
    // Original: return a * Math.sqrt(1 + b * b)
    // Mutated:  return a / Math.sqrt(1 + b * b)
    // We need a case where a >= b (so the second else branch is taken: b = y * x / a^2... wait)
    // Let's re-read: if a < b { a=b; b=x/y } else { b = y*x; } ... wait there's a bug in the code
    // Actually looking at the code more carefully:
    // if (a < b) { a = b; b = x / y; } else { b = y * x; }  <- note: b = y * x not b = y/x
    // Then: return a * Math.sqrt(1 + b * b)
    // For large values where a >= b (both >= 3000):
    // a stays as Math.abs(x), b becomes y * x (which is huge!)
    // Actually let me think about a simpler case: a >= b
    // x = 4000, y = 3000: a = 4000, b = 3000
    // since a >= b: b = y * x = 3000 * 4000 = 12000000
    // return 4000 * Math.sqrt(1 + 12000000^2) ≈ 4000 * 12000000 = 48000000000 (wrong)
    // 
    // Actually for a < b case: x = 3000, y = 4000
    // a = 3000, b = 4000, since a < b: a = 4000, b = x/y = 3000/4000 = 0.75
    // return 4000 * Math.sqrt(1 + 0.75^2) = 4000 * sqrt(1.5625) = 4000 * 1.25 = 5000
    // Expected: sqrt(3000^2 + 4000^2) = sqrt(9000000 + 16000000) = sqrt(25000000) = 5000 ✓
    // 
    // With mutation: return 4000 / Math.sqrt(1 + 0.75^2) = 4000 / 1.25 = 3200 ✗
    
    const c = new Complex(3000, 4000);
    const absValue = c.abs();
    
    // Expected: sqrt(3000^2 + 4000^2) = 5000
    expect(absValue).toBeCloseTo(5000, 5);
  });
});