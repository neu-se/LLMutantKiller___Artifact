import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc(0) imaginary part should be positive infinity, not zero", () => {
    const result = new Complex(0, 0).acsc();
    // In original: returns Complex(PI/2, Infinity) - isInfinite() returns true
    // In mutated: falls through to asin(0,0) = Complex(0,0) - isInfinite() returns false
    expect(result.isInfinite()).toBe(true);
  });
});