import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs() with large values", () => {
  it("should correctly compute the absolute value when both components are large (>= 3000)", () => {
    // When both a and b are >= 3000, hypot uses the branch:
    // if (a < b) { a = b; b = x / y; } else { b = y * x; }
    // then returns a * Math.sqrt(1 + b * b)  [original]
    // vs      a / Math.sqrt(1 + b * b)  [mutated]
    //
    // Use a = 4000, b = 3000 (so a >= b, taking the else branch: b = y/x = 3000/4000 = 0.75)
    // Original: a * sqrt(1 + 0.75^2) = 4000 * sqrt(1.5625) = 4000 * 1.25 = 5000
    // Mutated:  a / sqrt(1 + 0.75^2) = 4000 / 1.25 = 3200
    
    const c = new Complex(4000, 3000);
    const result = c.abs();
    
    // The expected absolute value of 4000 + 3000i is sqrt(4000^2 + 3000^2) = sqrt(16000000 + 9000000) = sqrt(25000000) = 5000
    expect(result).toBeCloseTo(5000, 5);
  });
});