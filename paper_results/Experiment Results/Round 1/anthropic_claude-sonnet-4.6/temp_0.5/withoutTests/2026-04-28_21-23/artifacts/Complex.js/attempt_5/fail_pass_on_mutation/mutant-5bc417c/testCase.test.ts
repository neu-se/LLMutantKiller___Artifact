import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth(0, MIN_VALUE) returns NaN real part in original", () => {
    const result = new Complex(0, Number.MIN_VALUE).acoth();
    expect(isNaN(result.re)).toBe(true);
  });
});