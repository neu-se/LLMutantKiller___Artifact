import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should return Infinity when inverting zero", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    expect(result.isInfinite()).toBe(true);
  });
});