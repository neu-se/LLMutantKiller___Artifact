import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth of complex number with nonzero imaginary part should be finite", () => {
    // For a=2, b=1: bypasses any b===0 early return
    // Original: d = 4+1 = 5, returns new Complex(2/5, -1/5).atanh() - finite result
    // Mutated: d is undefined, returns new Complex(NaN, NaN).atanh() = NaN
    const result = new Complex(2, 1).acoth();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});