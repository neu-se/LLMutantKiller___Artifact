import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("acoth(2) imaginary part should be negative zero", () => {
    const result = new Complex(2, 0).acoth();
    expect(result.re).toBeCloseTo(Math.log(3) / 2, 10);
    expect(Object.is(result.im, -0)).toBe(true);
  });
});