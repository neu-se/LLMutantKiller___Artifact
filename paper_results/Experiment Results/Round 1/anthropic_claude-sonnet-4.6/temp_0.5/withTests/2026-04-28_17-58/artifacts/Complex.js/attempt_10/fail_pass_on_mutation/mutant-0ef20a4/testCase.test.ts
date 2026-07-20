import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("multiplying a number by inverse of zero should give infinity", () => {
    const one = new Complex(1, 0);
    const zero = new Complex(0, 0);
    // 1 * (1/0) should be Infinity
    const result = one.mul(zero.inverse());
    expect(result.isInfinite()).toBe(true);
  });
});