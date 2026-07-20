import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot of NaN+NaN*i produces NaN result", () => {
    const result = new Complex(NaN, NaN).acot();
    expect(result.isNaN()).toBe(true);
  });
});