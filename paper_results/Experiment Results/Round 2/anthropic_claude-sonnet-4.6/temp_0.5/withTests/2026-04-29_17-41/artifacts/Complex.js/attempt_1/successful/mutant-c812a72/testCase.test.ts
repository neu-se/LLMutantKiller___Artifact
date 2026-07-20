import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex round method", () => {
  it("should round to the specified number of decimal places", () => {
    // When places = 0 (default), Math.pow(10, 0) = 1, Math.pow(10, true) = 10
    // So rounding 1.5 with no places argument:
    // Original: Math.pow(10, 0) = 1, round(1.5 * 1) / 1 = 2
    // Mutated: Math.pow(10, true) = Math.pow(10, 1) = 10, round(1.5 * 10) / 10 = 1.5
    const c = new Complex(1.5, 2.5);
    const result = c.round();
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);
  });
});