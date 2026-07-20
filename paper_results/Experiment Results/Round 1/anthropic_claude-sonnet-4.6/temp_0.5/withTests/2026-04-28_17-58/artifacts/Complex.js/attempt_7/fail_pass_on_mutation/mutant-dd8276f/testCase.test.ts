import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("should produce NaN for tiny complex input with negative imaginary part where d underflows", () => {
    // a=5e-200, b=-5e-200: d underflows to 0, early return skipped (a,b != 0)
    // re of fallback = (false) ? a/0 : 0 = 0 (always)
    // Original: im = (b !== 0) ? -b/0 : 0 = -(-5e-200)/0 = +Infinity → asin(0, Infinity) = NaN
    // Mutated:  im = (b === 0) ? -b/0 : 0 = 0                        → asin(0, 0) = Complex(0,0)
    const result = new Complex(5e-200, -5e-200).acsc();
    expect(result.isNaN()).toBe(true);
  });
});