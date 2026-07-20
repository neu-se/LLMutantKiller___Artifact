import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs extreme large values", () => {
  it("abs with very large values", () => {
    const c = new Complex(1e200, 1e100);
    const expected = Math.sqrt(1e400 + 1e200); // This overflows to Infinity
    // Actually expected = 1e200 (approximately, since 1e200 >> 1e100)
    // hypot(1e200, 1e100): a=1e200, b=1e100, a>=b
    // With a=b: a=1e100, b=1e200/1e100=1e100, result=1e100*sqrt(2)≈1.414e100
    // actual = sqrt(1e400+1e200) = 1e200*sqrt(1+1e-200) ≈ 1e200
    // Hmm, these don't match either
    expect(c.abs()).toBeCloseTo(1e200, -195);
  });
});