import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs() with large values", () => {
  it("should correctly compute the absolute value when imaginary part is much larger than real part", () => {
    // Both components trigger the large-number branch (>= 3000)
    // With re=3001, im=9000: correct abs = sqrt(3001^2 + 9000^2) ≈ 9487.15
    // The hypot function should use the larger value as the base for numerical stability
    const c = new Complex(3001, 9000);
    const result = c.abs();
    const expected = Math.sqrt(3001 * 3001 + 9000 * 9000);
    
    // The original code gives the correct result; the mutated code gives a wrong result
    expect(result).toBeCloseTo(expected, 5);
  });
});