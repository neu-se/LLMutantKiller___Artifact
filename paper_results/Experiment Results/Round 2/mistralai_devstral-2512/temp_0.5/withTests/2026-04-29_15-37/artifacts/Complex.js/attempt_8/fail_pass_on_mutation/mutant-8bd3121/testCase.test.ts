import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asech()", () => {
  it("should correctly handle the imaginary part in asech calculation", () => {
    const z = new Complex(0.5, 0.5);
    const result = z.asech();
    // The mutation changes this['im'] to this[""] which will be undefined
    // This should cause the calculation to produce NaN results
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    // Verify the result is not Infinity
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});