import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub", () => {
  it("should return NaN when both operands are infinite and Infinity when only one is infinite", () => {
    // Both infinite → NaN (both versions agree)
    const bothInf = Complex['INFINITY'].sub(Complex['INFINITY']);
    expect(bothInf.isNaN()).toBe(true);

    // Only this is infinite → 
    // Original (second if uses ||): Infinity
    // Mutated (second if uses &&): falls through, computes Infinity - 1 = NaN
    const result = Complex['INFINITY'].sub(new Complex(1, 0));
    expect(result.isInfinite()).toBe(true);
  });
});