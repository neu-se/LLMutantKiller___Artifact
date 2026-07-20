import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc mutation detection", () => {
  it("acsc of 0+NaN*i should not return zero", () => {
    const result = new Complex(0, NaN).acsc();
    // Original: goes through asin(0+NaN*i) -> NaN result
    // Mutated: goes through asin(0+0i) -> 0+0i result
    expect(isNaN(result.re) || isNaN(result.im)).toBe(true);
  });
});