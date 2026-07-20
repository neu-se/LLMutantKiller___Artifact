import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should produce infinite imaginary part for tiny complex input with non-zero imaginary part where d underflows", () => {
    // For z = 5e-200 + 5e-200*i: d underflows to 0, early return skipped
    // re part of fallback is always 0 (false ? a/0 : 0)
    // Original: im = (b !== 0) ? -b/0 : 0 = -Infinity → asin(0, -Infinity) = Complex(0, -Infinity)
    // Mutated:  im = (b === 0) ? -b/0 : 0 = 0         → asin(0, 0) = Complex(0, 0)
    const result = new Complex(5e-200, 5e-200).acsc();
    expect(result.isInfinite()).toBe(true);
  });
});