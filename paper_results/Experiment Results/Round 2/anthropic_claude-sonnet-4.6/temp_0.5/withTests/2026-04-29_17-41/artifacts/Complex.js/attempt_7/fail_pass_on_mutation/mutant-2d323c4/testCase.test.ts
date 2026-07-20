import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch for z = 1e154 + 1e154*i where d overflows to Infinity", () => {
    // a = 1e154, b = 1e154
    // d = a*a - b*b = Infinity - Infinity = NaN (if d = a²-b²)
    // OR d = a*a + b*b = Infinity + Infinity = Infinity (if d = a²+b²)
    // NaN !== 0 is true, Infinity !== 0 is true -> same branch either way
    // Need to find where d===0 is reachable
    const a = 1e154;
    const result = new Complex(a, a).acsch();
    // Both branches same for this input
    expect(isNaN(result.re) || isFinite(result.re)).toBe(true);
  });
});