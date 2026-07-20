import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex ceil function", () => {
  it("should correctly ceil a complex number with specified decimal places", () => {
    // The mutation changes `places = Math.pow(10, places || 0)` to `places = Math.pow(10, false)`
    // Math.pow(10, false) = Math.pow(10, 0) = 1, which means places=2 would be treated as places=0
    // So ceil(2) should give different results than ceil(0)
    
    const c = new Complex(1.234, 2.567);
    
    // With places=2, original code: Math.pow(10, 2) = 100
    // ceil(1.234 * 100) / 100 = ceil(123.4) / 100 = 124 / 100 = 1.24
    // ceil(2.567 * 100) / 100 = ceil(256.7) / 100 = 257 / 100 = 2.57
    
    // With mutated code: Math.pow(10, false) = Math.pow(10, 0) = 1
    // ceil(1.234 * 1) / 1 = ceil(1.234) / 1 = 2
    // ceil(2.567 * 1) / 1 = ceil(2.567) / 1 = 3
    
    const result = c.ceil(2);
    
    expect(result.re).toBeCloseTo(1.24, 10);
    expect(result.im).toBeCloseTo(2.57, 10);
  });
});