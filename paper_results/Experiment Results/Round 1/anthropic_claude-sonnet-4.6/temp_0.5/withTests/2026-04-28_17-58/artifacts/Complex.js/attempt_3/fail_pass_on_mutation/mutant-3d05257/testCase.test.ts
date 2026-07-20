import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should produce a finite real part for acosh(2)", () => {
    // For acosh(2): acos(2) gives a result with im <= 0
    // Original: res['re'] = -res['im'] which is a valid finite number
    // Mutated:  res['re'] = -res[""] = -undefined = NaN
    // So in the mutated code, result.re will be NaN
    const result = new Complex(2, 0).acosh();
    
    // acosh(2) ≈ 1.3169578969248166 (real, positive)
    const expected = Math.log(2 + Math.sqrt(3)); // = acosh(2)
    
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(expected, 10);
  });
});