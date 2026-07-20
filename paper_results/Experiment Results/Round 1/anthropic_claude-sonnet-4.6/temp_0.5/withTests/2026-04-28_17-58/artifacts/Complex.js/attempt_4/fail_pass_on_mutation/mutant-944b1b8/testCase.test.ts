import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("should return non-NaN result for asec of purely imaginary number", () => {
    const result = new Complex(0, 2).asec();
    // Original: new Complex(0, -Infinity).acos() -> real part is -Infinity (not NaN)
    // Mutated: new Complex(NaN, -Infinity).acos() -> NaN result
    expect(isNaN(result.re)).toBe(false);
  });
});