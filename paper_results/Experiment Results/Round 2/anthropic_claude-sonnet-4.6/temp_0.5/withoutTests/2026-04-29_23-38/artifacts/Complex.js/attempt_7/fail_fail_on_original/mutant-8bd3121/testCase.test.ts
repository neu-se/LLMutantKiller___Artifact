import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should compute asech(3+4i) correctly", () => {
    const c = new Complex(3, 4);
    const result = c.asech();
    
    // In original: d = 9+16=25, passes Complex(3/25, -4/25) = Complex(0.12, -0.16) to acosh
    // In mutant: b=undefined, d=NaN, passes Complex(NaN, NaN) to acosh -> result is NaN
    // Verify result is not NaN
    expect(result.isNaN()).toBe(false);
    // Verify specific value: asech(3+4i) re part
    expect(result.re).toBeCloseTo(0.1642, 3);
  });
});