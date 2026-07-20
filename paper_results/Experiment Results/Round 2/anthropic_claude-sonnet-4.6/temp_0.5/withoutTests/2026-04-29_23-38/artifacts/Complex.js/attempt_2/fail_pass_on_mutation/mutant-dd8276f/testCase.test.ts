import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc mutation detection", () => {
  it("acsc of 0+NaN*i should produce NaN imaginary part", () => {
    const result = new Complex(0, NaN).acsc();
    expect(isNaN(result.im)).toBe(true);
  });
});