import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asinh()", () => {
  it("should correctly compute asinh and maintain proper state", () => {
    const c = new Complex(0, 1);
    const result = c.asinh();
    // The mutation changes this['im'] to this[""] which will break the state restoration
    // This test checks both the result and that the original object is unchanged
    expect(c.re).toBe(0);
    expect(c.im).toBe(1);
    // Expected result for asinh(0 + 1i)
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0.881373587019543, 10);
  });
});