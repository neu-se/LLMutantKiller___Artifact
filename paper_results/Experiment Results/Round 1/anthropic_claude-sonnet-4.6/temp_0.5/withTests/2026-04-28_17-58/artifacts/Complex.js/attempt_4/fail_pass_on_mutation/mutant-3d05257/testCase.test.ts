import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should produce correct real part for acosh of a complex number where acos has negative imaginary part", () => {
    // For z = 2+0i: acos(2) has im < 0 (negative imaginary part)
    // Original: res['re'] = -res['im'] = -(negative number) = positive number
    // Mutated:  res['re'] = -res[""] = NaN
    // But tmp = res[""] = undefined, so res['im'] = undefined = NaN in both cases
    // The difference: original res['re'] is a valid number, mutated res['re'] is NaN
    
    const result = new Complex(2, 0).acosh();
    
    // In original code: re = acosh(2) ≈ 1.3169578969248166, im = NaN (due to tmp=res[""])
    // Wait, let me check what res[""] actually is...
    // res is a Complex object, res[""] accesses property "" which doesn't exist = undefined
    // So tmp = undefined, res['im'] = undefined which becomes NaN
    // But the test for acosh(2) passed before... let me check re specifically
    
    // acosh(2) real part should be ln(2 + sqrt(3))
    expect(result.re).toBeCloseTo(Math.log(2 + Math.sqrt(3)), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});