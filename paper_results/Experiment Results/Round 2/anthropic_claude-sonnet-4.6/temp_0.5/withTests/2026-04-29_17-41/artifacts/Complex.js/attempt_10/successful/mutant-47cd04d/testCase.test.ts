import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add", () => {
  it("adding finite to one-dimensional infinity should return INFINITY", () => {
    const c = new Complex(1, 0);
    const result = c.add(Infinity, 0);
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
    // In original: returns Complex.INFINITY (re=Inf, im=Inf)
    // In mutated (if first check is &&): falls through to new Complex(1+Inf, 0+0) = new Complex(Inf, 0)
    // Both are infinite, but imaginary parts differ!
    expect(result.im).toBe(Infinity);
  });
});