import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex floor method", () => {
  it("should floor with 0 decimal places by default (no argument)", () => {
    // When no argument is passed, places || 0 = 0, so Math.pow(10, 0) = 1
    // In mutated code, Math.pow(10, true) = Math.pow(10, 1) = 10
    // This means floor(3.7 * 10) / 10 = floor(37) / 10 = 3.7 instead of floor(3.7 * 1) / 1 = 3
    const c = new Complex(3.7, 2.9);
    const result = c.floor();
    expect(result.re).toBe(3);
    expect(result.im).toBe(2);
  });
});