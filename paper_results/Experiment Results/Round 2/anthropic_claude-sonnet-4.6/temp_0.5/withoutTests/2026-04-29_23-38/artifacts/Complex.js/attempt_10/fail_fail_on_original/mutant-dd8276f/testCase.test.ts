import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc mutation detection", () => {
  it("acsc of very small real number where d underflows should return zero not NaN", () => {
    // With a=1e-200, b=0, d = a*a underflows to 0
    // Original: (b !== 0) is false -> 0 -> asin(0+0i) = {re:0, im:0}
    // Mutated: (b === 0) is true -> -0/0 = NaN -> asin(0+NaN*i) = NaN
    const result = new Complex(1e-200, 0).acsc();
    expect(isNaN(result.re) || isNaN(result.im)).toBe(false);
  });
});