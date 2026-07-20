import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex floor method", () => {
  it("should floor with default places (0) correctly, not with places=true (which equals 1)", () => {
    // With original code: places = Math.pow(10, places || 0) = Math.pow(10, 0) = 1
    // floor(3.7 * 1) / 1 = floor(3.7) / 1 = 3 / 1 = 3
    // floor(2.9 * 1) / 1 = floor(2.9) / 1 = 2 / 1 = 2
    
    // With mutated code: places = Math.pow(10, true) = Math.pow(10, 1) = 10
    // floor(3.7 * 10) / 10 = floor(37) / 10 = 37 / 10 = 3.7
    // floor(2.9 * 10) / 10 = floor(29) / 10 = 29 / 10 = 2.9
    
    const c = new Complex(3.7, 2.9);
    const result = c.floor();
    
    expect(result.re).toBe(3);
    expect(result.im).toBe(2);
  });
});