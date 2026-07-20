import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex round method", () => {
  it("should round with 0 decimal places when no argument is provided", () => {
    // In original code: places = Math.pow(10, places || 0) = Math.pow(10, 0) = 1
    // In mutated code: places = Math.pow(10, true) = Math.pow(10, 1) = 10
    // So rounding 1.5 + 2.5i:
    // Original: Math.round(1.5 * 1) / 1 = 2, Math.round(2.5 * 1) / 1 = 3 => 2 + 3i
    // Mutated: Math.round(1.5 * 10) / 10 = 1.5, Math.round(2.5 * 10) / 10 = 2.5 => 1.5 + 2.5i
    const c = new Complex(1.5, 2.5);
    const result = c.round();
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);
  });
});