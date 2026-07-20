import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should not return NaN when inverting zero, but should return Infinity", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    expect(result.isNaN()).toBe(false);
    expect(result.isInfinite()).toBe(true);
  });
});