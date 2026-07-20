import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for a real number greater than 1", () => {
    // acosh(2) should give a real result with im = 0
    // The mutation changes res['re'] = -res['im'] to res['re'] = -res[""]
    // res[""] is undefined, so -undefined = NaN
    // This means the real part of acosh will be NaN in the mutated code
    const result = new Complex(2, 0).acosh();
    
    // acosh(2) = ln(2 + sqrt(3)) ≈ 1.3169578969248166
    const expected = Math.acosh(2);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});