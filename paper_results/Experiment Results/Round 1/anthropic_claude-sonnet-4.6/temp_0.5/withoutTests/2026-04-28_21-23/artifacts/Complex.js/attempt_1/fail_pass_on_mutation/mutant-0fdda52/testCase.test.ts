import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex hypot large values", () => {
  it("should correctly compute abs() for large complex numbers where imaginary part is larger than real part", () => {
    // The mutation affects the hypot function's branch condition for large values (>= 3000)
    // Original: if (a < b) { a = b; b = x / y; }
    // Mutated:  if (a >= b) { a = b; b = x / y; }
    // 
    // For large values, hypot computes: if a < b, swap so a is the larger value
    // With mutation, the logic is inverted, causing wrong results when a < b (i.e., |re| < |im|)
    
    // Use values > 3000 to trigger the large-value branch
    // Make |im| > |re| to trigger the a < b branch
    const c = new Complex(3001, 4001);
    const absValue = c.abs();
    
    // Expected: sqrt(3001^2 + 4001^2) = sqrt(9006001 + 16008001) = sqrt(25014002)
    const expected = Math.sqrt(3001 * 3001 + 4001 * 4001);
    
    expect(absValue).toBeCloseTo(expected, 5);
  });
});