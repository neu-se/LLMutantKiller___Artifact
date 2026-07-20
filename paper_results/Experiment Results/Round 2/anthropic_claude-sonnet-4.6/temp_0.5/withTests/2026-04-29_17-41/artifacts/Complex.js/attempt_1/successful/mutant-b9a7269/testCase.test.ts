import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex floor method", () => {
  it("should floor with default places (0) correctly", () => {
    // With original code: places = Math.pow(10, 0) = 1
    // With mutated code: places = Math.pow(10, true) = Math.pow(10, 1) = 10
    // For default (no argument), original uses places=1, mutated uses places=10
    // floor(3.7 * 1) / 1 = 3 (original)
    // floor(3.7 * 10) / 10 = 3.7 (mutated)
    const c = new Complex(3.7, 2.9);
    const result = c.floor();
    expect(result.re).toBe(3);
    expect(result.im).toBe(2);
  });
});