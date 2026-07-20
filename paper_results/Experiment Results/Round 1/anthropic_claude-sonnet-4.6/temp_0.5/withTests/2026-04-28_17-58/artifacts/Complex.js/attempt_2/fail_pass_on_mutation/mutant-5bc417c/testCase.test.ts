import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth of zero complex number should handle d=0 case correctly", () => {
    // When a=0, b=0: d = 0*0 + 0*0 = 0
    // Original: d !== 0 is false, so takes the else branch with special NaN/Infinity handling
    // Mutated: true, so always takes the first branch, calling (0/0 + -0/0*i).atanh() differently
    const result = new Complex(0, 0).acoth();
    // Original code: d=0, a=0, b=0 -> new Complex(0, 0).atanh() via else branch
    // The else branch: (a !== 0) ? a/0 : 0 = 0, (b !== 0) ? -b/0 : 0 = 0 -> atanh(0) = 0
    // Mutated: (0/0 + -0/0*i).atanh() via first branch
    expect(isNaN(result.re) || result.re === 0).toBe(true);
  });
});