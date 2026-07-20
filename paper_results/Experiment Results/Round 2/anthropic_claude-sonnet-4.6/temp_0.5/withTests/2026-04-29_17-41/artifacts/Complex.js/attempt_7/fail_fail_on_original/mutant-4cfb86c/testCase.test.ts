import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot(1 + NaN*i) differs between original and mutant", () => {
    const result = new Complex(1, NaN).acot();
    // Original: else branch re = (1 !== 0) ? 1/0 : 0 = Infinity
    // Mutated:  else branch re = (1 === 0) ? 1/0 : 0 = 0
    // atan(Infinity + ...) vs atan(0 + ...) produce different results
    // Original produces Infinity-based result, mutant produces finite/NaN result
    expect(isFinite(result.re) || isNaN(result.re)).toBe(false);
  });
});