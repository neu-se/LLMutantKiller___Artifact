import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc mutation detection", () => {
  it("acsc of very small complex number where d underflows should produce NaN not zero", () => {
    // With a=1e-200, b=1e-200, d = a*a + b*b underflows to 0
    // Original: b !== 0 is true -> -b/0 = -Infinity -> asin(0, -Infinity) -> NaN
    // Mutated: b === 0 is false -> 0 -> asin(0, 0) -> {re:0, im:0}
    const result = new Complex(1e-200, 1e-200).acsc();
    expect(isNaN(result.re) || isNaN(result.im)).toBe(true);
  });
});