import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec underflow", () => {
  it("should handle asec when d underflows to zero with non-zero b", () => {
    // If a and b are so small that a*a + b*b underflows to 0,
    // the d===0 branch is reached. With b != 0, original gives -b/0 = ±Infinity
    // but mutated gives 0.
    const tiny = 5e-324; // Number.MIN_VALUE
    const c = new Complex(0, tiny);
    const result = c.asec();
    // Original: d = 0+tiny*tiny = 0 (underflow), b !== 0, so im = -tiny/0 = -Infinity
    // Then Complex(0, -Infinity).acos() is called
    // Mutated: im = 0, so Complex(0, 0).acos() is called
    expect(isNaN(result.re) || isFinite(result.re)).toBeDefined();
    // The key difference: original path gives different result than mutated
    const originalPath = new Complex(0, -Infinity).acos();
    const mutatedPath = new Complex(0, 0).acos();
    expect(result.re).not.toBeCloseTo(mutatedPath.re, 5);
  });
});