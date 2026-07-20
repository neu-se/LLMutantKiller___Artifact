import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("asec of 0.5i should match expected value", () => {
    // For asec(0.5i): a=0, b=0.5, d=0.25
    // Original else: new Complex(0, -0.5/0).acos() = new Complex(0, -Inf).acos()
    // Mutated else:  new Complex(0/0, -Inf).acos() = new Complex(NaN, -Inf).acos()
    const orig = new Complex(0, -Infinity).acos();
    const mut = new Complex(NaN, -Infinity).acos();
    // Verify these actually differ, then test asec
    const result = new Complex(0, 0.5).asec();
    expect(result.re).toBe(orig.re);
    expect(result.im).toBe(orig.im);
  });
});