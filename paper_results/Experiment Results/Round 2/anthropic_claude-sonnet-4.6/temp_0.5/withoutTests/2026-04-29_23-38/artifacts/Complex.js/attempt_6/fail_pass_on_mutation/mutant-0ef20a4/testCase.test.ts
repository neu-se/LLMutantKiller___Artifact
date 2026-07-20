import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("inverse of zero should be infinite, verified via isInfinite()", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});