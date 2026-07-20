import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex ceil method", () => {
  it("should correctly ceil with a specified number of decimal places", () => {
    const c = new Complex(1.234, 5.678);
    const result = c.ceil(2);
    // With original code: places = Math.pow(10, 2) = 100
    // ceil(1.234 * 100) / 100 = ceil(123.4) / 100 = 124 / 100 = 1.24
    // ceil(5.678 * 100) / 100 = ceil(567.8) / 100 = 568 / 100 = 5.68
    // With mutated code: places = Math.pow(10, false) = Math.pow(10, 0) = 1
    // ceil(1.234 * 1) / 1 = ceil(1.234) / 1 = 2
    // ceil(5.678 * 1) / 1 = ceil(5.678) / 1 = 6
    expect(result.re).toBeCloseTo(1.24, 10);
    expect(result.im).toBeCloseTo(5.68, 10);
  });
});