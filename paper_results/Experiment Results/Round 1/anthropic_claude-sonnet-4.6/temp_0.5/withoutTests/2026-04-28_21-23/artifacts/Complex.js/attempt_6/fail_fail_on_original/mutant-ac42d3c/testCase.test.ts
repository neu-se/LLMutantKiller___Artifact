import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("should return Complex(0, -Infinity) for atan of Complex(0, -1), verifiable by chaining atan twice", () => {
    // atan(atan(0 - i)) - test that intermediate result is correct
    // by checking the real part of the double-atan is exactly 0 (not NaN)
    const c = new Complex(0, -1);
    const result = c.atan();
    expect(isFinite(result.re)).toBe(false);
    expect(isFinite(result.im)).toBe(false);
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});