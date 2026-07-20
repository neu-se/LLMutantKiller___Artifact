import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex number operations", () => {
  it("div by zero should return infinity", () => {
    // If isZero check in div is mutated, 0/0 would return NaN instead of NaN (already NaN)
    // Let's test Infinity/0 which should return INFINITY
    const inf = Complex.INFINITY;
    const zero = Complex.ZERO;
    // Test inverse: 1/z where z approaches zero via div
    const one = new Complex(1, 0);
    const tiny = new Complex(0, 0);
    const result = one.div(tiny);
    expect(result.isInfinite()).toBe(true);
  });
});