import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs with large values", () => {
  it("should correctly compute abs() when imaginary part is larger than real part and both exceed 3000", () => {
    // Both values > 3000 to trigger the large-value branch in hypot
    // |im| > |re| so a < b in hypot, triggering the mutated condition
    const c = new Complex(3001, 9999);
    const absValue = c.abs();
    
    // Expected: sqrt(3001^2 + 9999^2)
    const expected = Math.sqrt(3001 * 3001 + 9999 * 9999);
    
    // The mutated code will produce an incorrect result here
    expect(absValue).toBeCloseTo(expected, 3);
  });
});