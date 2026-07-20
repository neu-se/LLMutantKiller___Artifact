import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch with subnormal inputs", () => {
  it("computes acsch correctly when d underflows to zero but a is nonzero", () => {
    // Use values so small that a*a + b*b underflows to 0, but a != 0
    // 5e-200 * 5e-200 = 25e-400 which underflows to 0
    const a = 5e-200;
    const b = 5e-200;
    const c = new Complex(a, b);
    const result = c.acsch();
    // Original: (a !== 0) ? a/0 : 0 => Infinity (since a != 0)
    // Mutated: (false) ? a/0 : 0 => 0
    expect(result.re).toBe(Infinity);
  });
});