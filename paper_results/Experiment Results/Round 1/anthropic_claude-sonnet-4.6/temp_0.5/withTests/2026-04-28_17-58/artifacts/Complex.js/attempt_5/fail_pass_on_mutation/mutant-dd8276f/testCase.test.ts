import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should produce NaN for tiny complex input with non-zero imaginary part where d underflows", () => {
    // For z = 5e-200 + 5e-200*i: d underflows to 0, early return skipped (a,b != 0)
    // Original: im = (b !== 0) ? -b/0 : 0 = -Infinity → asin(Infinity, -Infinity) = NaN
    // Mutated:  im = (b === 0) ? -b/0 : 0 = 0         → asin(Infinity, 0) = non-NaN
    const result = new Complex(5e-200, 5e-200).acsc();
    expect(result.isNaN()).toBe(true);
  });
});