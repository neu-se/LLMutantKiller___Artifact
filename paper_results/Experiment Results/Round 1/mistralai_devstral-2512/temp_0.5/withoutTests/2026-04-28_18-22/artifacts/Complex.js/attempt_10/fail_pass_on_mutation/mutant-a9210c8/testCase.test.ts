import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should produce finite results for sech calculation", () => {
    const c = new Complex(1, 1);
    const result = c.sech();
    // The mutation changes this['im'] to this[""] which will be undefined
    // This will cause the calculation to produce NaN or Infinity
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});