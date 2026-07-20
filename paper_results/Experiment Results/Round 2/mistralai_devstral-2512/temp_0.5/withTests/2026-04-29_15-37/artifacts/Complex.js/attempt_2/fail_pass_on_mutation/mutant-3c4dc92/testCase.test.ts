import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.atanh()", () => {
  it("should correctly handle edge case where real part is close to 1", () => {
    const c = new Complex(0.999, 0.001);
    const result = c.atanh();
    expect(result.isInfinite()).toBe(false);
    expect(result.isNaN()).toBe(false);
    expect(Math.abs(result.re)).toBeGreaterThan(1);
    expect(Math.abs(result.im)).toBeLessThan(1);
  });
});