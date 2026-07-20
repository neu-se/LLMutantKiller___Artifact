import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("should return complex infinity for atan(0 - i) via isInfinite check", () => {
    const result = new Complex(0, -1).atan();
    // Original returns new Complex(0, -Infinity)
    // The im part should be -Infinity
    expect(result.im).toBe(-Infinity);
    expect(result.re).toBe(0);
    // Additionally verify it's not NaN
    expect(result.isNaN()).toBe(false);
  });
});