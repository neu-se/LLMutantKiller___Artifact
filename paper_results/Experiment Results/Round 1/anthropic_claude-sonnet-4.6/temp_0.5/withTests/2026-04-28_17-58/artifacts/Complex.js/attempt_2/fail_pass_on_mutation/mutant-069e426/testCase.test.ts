import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("asec with negative zero inputs reaches the d===0 else branch differently", () => {
    // Try to construct a Complex with -0, -0 bypassing the parse check
    const c = new Complex(0, 0);
    c['re'] = -0;
    c['im'] = -0;
    // d = (-0)*(-0) + (-0)*(-0) = 0, but a===0 && b===0 is true for -0
    // early return fires, so this still returns Complex(0, Infinity)
    const result = c.asec();
    expect(result.re).toBe(0);
    expect(result.im).toBe(Infinity);
  });
});