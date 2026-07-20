import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot(NaN + i) re part differs between original and mutant", () => {
    const result = new Complex(NaN, 1).acot();
    // Original: else branch re = (NaN !== 0) ? NaN/0 : 0 = NaN → atan(NaN + ...) = NaN
    // Mutated:  else branch re = (NaN === 0) ? NaN/0 : 0 = 0  → atan(0 + ...) = finite
    // So original.isNaN() = true, mutant.isNaN() = false
    expect(result.isNaN()).toBe(true);
  });
});