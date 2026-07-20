import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should return NaN for acsch of a subnormal imaginary value where d underflows to zero", () => {
    const tiny = Number.MIN_VALUE; // tiny*tiny underflows to 0
    const c = new Complex(0, tiny);
    const result = c.acsch();
    // Original: fallback computes new Complex(0, -Infinity).asinh() which results in NaN
    // Mutated: fallback computes new Complex(0, 0).asinh() = 0, so im = 0 (not NaN)
    expect(result.isNaN()).toBe(true);
  });
});