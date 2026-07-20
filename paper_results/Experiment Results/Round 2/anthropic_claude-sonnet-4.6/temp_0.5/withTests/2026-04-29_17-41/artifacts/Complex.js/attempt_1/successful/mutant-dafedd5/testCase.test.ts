import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex ceil method", () => {
  it("should ceil to specified decimal places correctly", () => {
    const c = new Complex(1.234, 2.567);
    const result = c.ceil(2);
    
    // Original: places = Math.pow(10, 2) = 100
    // Math.ceil(1.234 * 100) / 100 = Math.ceil(123.4) / 100 = 124 / 100 = 1.24
    // Mutated: places = Math.pow(10, false) = 1
    // Math.ceil(1.234 / 1) / 1 = Math.ceil(1.234) = 2
    expect(result.re).toBeCloseTo(1.24, 10);
    expect(result.im).toBeCloseTo(2.57, 10);
  });
});