import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex ceil method", () => {
  it("should correctly ceil with a specified number of decimal places", () => {
    const c = new Complex(1.234, 5.678);
    const result = c.ceil(2);
    // With places = Math.pow(10, 2) = 100, we get ceil(1.234 * 100) / 100 = ceil(123.4) / 100 = 124 / 100 = 1.24
    // With mutated places = Math.pow(10, false) = Math.pow(10, 0) = 1, we get ceil(1.234 * 1) / 1 = ceil(1.234) / 1 = 2
    expect(result.re).toBeCloseTo(1.24, 10);
    expect(result.im).toBeCloseTo(5.68, 10);
  });
});