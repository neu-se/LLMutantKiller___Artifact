import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex round method", () => {
  it("should round with 0 decimal places when no argument is provided", () => {
    const c = new Complex(1.5, 2.7);
    const result = c.round();
    // With original code: places = Math.pow(10, 0) = 1, so round to 0 decimal places
    // With mutated code: places = Math.pow(10, true) = Math.pow(10, 1) = 10, so round to 1 decimal place
    expect(result.re).toBe(2);
    expect(result.im).toBe(3);
  });
});