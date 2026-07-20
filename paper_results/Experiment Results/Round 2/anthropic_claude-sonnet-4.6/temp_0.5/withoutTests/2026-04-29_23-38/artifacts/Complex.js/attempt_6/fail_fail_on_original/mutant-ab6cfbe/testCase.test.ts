import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("pow(0+0i, 0.5) should give NaN in original (falls through switch) vs 0 in mutated", () => {
    const result = new Complex(0, 0).pow(0.5);
    expect(isNaN(result.re)).toBe(true);
  });
});