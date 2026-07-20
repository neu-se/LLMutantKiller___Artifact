import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot mutation", () => {
  it("acot of NaN+NaN*i should have NaN imaginary part", () => {
    const result = new Complex(NaN, NaN).acot();
    expect(isNaN(result.re)).toBe(true);
  });
});