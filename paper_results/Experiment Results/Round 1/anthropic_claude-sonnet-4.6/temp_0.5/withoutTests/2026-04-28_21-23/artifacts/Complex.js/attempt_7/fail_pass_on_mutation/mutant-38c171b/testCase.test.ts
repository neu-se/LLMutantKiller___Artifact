import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch of tiny complex number does not equal zero", () => {
    const tiny = Math.pow(2, -600);
    const result = new Complex(tiny, tiny).acsch();
    // Mutated gives {re:0, im:0}, original gives NaN
    // equals() uses Math.abs(z.re - this.re) <= EPSILON
    // NaN comparisons return false, so NaN.equals(0) = false
    // {re:0,im:0}.equals(0) = true
    expect(result.equals(0)).toBe(false);
  });
});