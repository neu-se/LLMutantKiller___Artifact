import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("inverse of zero should be infinite and not NaN", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    const nan = result.isNaN();
    const infinite = result.isInfinite();
    expect(nan).toBe(false);
    expect(infinite).toBe(true);
  });
});