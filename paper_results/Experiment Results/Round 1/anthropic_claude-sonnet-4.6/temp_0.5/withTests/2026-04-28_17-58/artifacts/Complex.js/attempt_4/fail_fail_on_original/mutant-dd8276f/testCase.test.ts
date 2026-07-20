import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should not produce NaN for tiny real input where d underflows to zero", () => {
    // For z = 5e-200 + 0i: d underflows to 0, early return skipped
    // Original: im = (b !== 0) ? -b/0 : 0 = 0  → asin(Infinity, 0)
    // Mutated:  im = (b === 0) ? -b/0 : 0 = NaN → asin(Infinity, NaN) = NaN
    const result = new Complex(5e-200, 0).acsc();
    expect(result.isNaN()).toBe(false);
  });
});