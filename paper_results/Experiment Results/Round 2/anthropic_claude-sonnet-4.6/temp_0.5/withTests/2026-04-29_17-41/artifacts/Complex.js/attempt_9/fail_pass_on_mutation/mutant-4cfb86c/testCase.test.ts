import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot(NaN + 1i) produces NaN in original but not in mutant", () => {
    const result = new Complex(NaN, 1).acot();
    // Original: re=(NaN!==0)?NaN/0:0=NaN → atan(NaN,-Inf) → NaN
    // Mutated:  re=(NaN===0)?NaN/0:0=0  → atan(0,-Inf) → finite
    expect(isNaN(result.re)).toBe(true);
  });
});