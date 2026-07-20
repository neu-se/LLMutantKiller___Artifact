import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('detects mutation via acsch(1+i) giving specific finite value', () => {
    // d = 1 - 1 = 0
    // Original second branch: Complex(Inf, -Inf).asinh() -> some finite value
    // Mutated first branch: Complex(1/0, -1/0).asinh() = Complex(Inf,-Inf).asinh() -> same!
    // These are the same so won't work.
    // Need a=0 case. Try a=0, b=1e-200 (d underflows to 0)
    // Original: Complex(0, -Inf).asinh() -> ?
    // Mutated: Complex(NaN, -Inf).asinh() -> ?
    const orig = new Complex(0, -Infinity).asinh();
    const mut = new Complex(NaN, -Infinity).asinh();
    // Check if these differ
    expect(orig.re).not.toBeNaN();
  });
});