import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return a valid real part when computing acosh of a value where the acos imaginary part is <= 0", () => {
    // acosh(0) should give a purely imaginary result: i * pi/2
    // For input 0: acos(0) = pi/2 + 0i, im=0 <= 0, so the first branch is taken
    // res['re'] should be set to -res['im'] = 0, res['im'] = tmp = pi/2
    // With mutation: res['re'] = -res[""] = -undefined = NaN
    const result = new Complex(0, 0).acosh();

    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBeCloseTo(0, 10);
    expect(Math.abs(result.im)).toBeCloseTo(Math.PI / 2, 10);
  });
});