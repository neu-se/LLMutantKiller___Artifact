import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should give finite result for inputs just above underflow threshold and NaN at threshold", () => {
    // 1e-162 squared = 1e-324 which is approximately Number.MIN_VALUE (5e-324)
    // so (1e-162)^2 + (1e-162)^2 = 2e-324 which is > 0 (not underflow)
    const justAbove = 1e-162;
    const resultAbove = new Complex(justAbove, justAbove).acot();
    expect(isFinite(resultAbove.re)).toBe(true);
    expect(isFinite(resultAbove.im)).toBe(true);

    // 1e-163 squared = 1e-326 which underflows to 0
    // so d = 0, hits the mutation branch
    const atThreshold = 1e-163;
    const resultAt = new Complex(atThreshold, atThreshold).acot();
    expect(resultAt.isNaN()).toBe(true);
  });
});