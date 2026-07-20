import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.sech", () => {
  it("should correctly handle the imaginary part in sech calculation", () => {
    const c = new Complex(0.5, 0.5);
    const result = c.sech();
    // The mutation changes this['im'] to this[""] which will be undefined
    // This will cause NaN in the calculation, making the result invalid
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});