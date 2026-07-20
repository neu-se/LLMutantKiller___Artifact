import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex round method", () => {
  it("should round to the specified number of decimal places", () => {
    // When places = 0 (default), Math.pow(10, 0) = 1, so rounding to integer
    // Original: places = Math.pow(10, places || 0) => Math.pow(10, 0) = 1
    // Mutated: places = Math.pow(10, true) => Math.pow(10, 1) = 10
    // This means with no argument, original rounds to integer, mutated rounds to 1 decimal place

    const c = new Complex(1.567, 2.789);
    const result = c.round(0);

    // With places=0: Math.pow(10, 0) = 1
    // round(1.567 * 1) / 1 = round(1.567) / 1 = 2
    // round(2.789 * 1) / 1 = round(2.789) / 1 = 3
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);
  });
});