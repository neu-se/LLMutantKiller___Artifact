import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth of real number 2 returns correct value", () => {
    const result = new Complex(2, 0).acoth();
    // acoth(2) = atanh(1/2) = 0.5493061443340548
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    // im should be -0 or 0
    expect(Math.abs(result.im)).toBeCloseTo(0, 10);
  });
});