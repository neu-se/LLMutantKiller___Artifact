import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot with NaN input", () => {
  it("acot of NaN should produce NaN imaginary part", () => {
    const result = new Complex(NaN, NaN).acot();
    expect(isNaN(result.im)).toBe(true);
  });
});