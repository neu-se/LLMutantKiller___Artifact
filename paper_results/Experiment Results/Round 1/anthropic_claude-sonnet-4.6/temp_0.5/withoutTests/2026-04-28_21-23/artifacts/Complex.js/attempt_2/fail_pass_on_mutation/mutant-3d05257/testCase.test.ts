import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return a non-NaN real part for acosh(2)", () => {
    // acosh(2) = log(2 + sqrt(3)) ≈ 1.3169578969248166
    // The mutation sets res['re'] = -res[""] = -undefined = NaN
    const result = new Complex(2, 0).acosh();
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBeCloseTo(1.3169578969248166, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});