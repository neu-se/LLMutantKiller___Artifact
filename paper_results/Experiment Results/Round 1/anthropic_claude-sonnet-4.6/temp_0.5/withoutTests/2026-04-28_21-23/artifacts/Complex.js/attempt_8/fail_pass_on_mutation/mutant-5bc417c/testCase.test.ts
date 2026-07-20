import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth with purely imaginary subnormal input produces NaN imaginary part", () => {
    const result = new Complex(0, Number.MIN_VALUE).acoth();
    expect(isNaN(result.im)).toBe(true);
  });
});