import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex ceil with places parameter", () => {
  it("should correctly ceil to specified decimal places", () => {
    // The mutation changes `Math.pow(10, places || 0)` to `Math.pow(10, false)`
    // Math.pow(10, false) = Math.pow(10, 0) = 1, which means it always rounds to integer
    // The original code with places=2 should use Math.pow(10, 2) = 100
    // giving precision to 2 decimal places
    // The mutated code always uses Math.pow(10, 0) = 1, rounding to integer
    
    const c = new Complex(1.234, 5.678);
    const result = c.ceil(2);
    
    // With original code: places = Math.pow(10, 2) = 100
    // Math.ceil(1.234 * 100) / 100 = Math.ceil(123.4) / 100 = 124 / 100 = 1.24
    // Math.ceil(5.678 * 100) / 100 = Math.ceil(567.8) / 100 = 568 / 100 = 5.68
    
    // With mutated code: places = Math.pow(10, false) = Math.pow(10, 0) = 1
    // Math.ceil(1.234 * 1) / 1 = Math.ceil(1.234) / 1 = 2
    // Math.ceil(5.678 * 1) / 1 = Math.ceil(5.678) / 1 = 6
    
    expect(result.re).toBeCloseTo(1.24, 10);
    expect(result.im).toBeCloseTo(5.68, 10);
  });
});