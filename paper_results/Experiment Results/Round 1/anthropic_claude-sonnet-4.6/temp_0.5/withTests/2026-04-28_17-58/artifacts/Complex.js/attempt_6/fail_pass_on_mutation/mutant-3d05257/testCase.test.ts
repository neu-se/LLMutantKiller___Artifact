import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should compute acosh(3) with correct real and imaginary parts", () => {
    // For acosh(3), acos(3) has im < 0, so the if-branch is taken
    // Original: tmp = res['re'] (a number), res['re'] = -res['im'], res['im'] = tmp
    // Mutated:  tmp = res[""] = undefined, res['re'] = -res[""] = NaN, res['im'] = undefined = NaN
    const result = new Complex(3, 0).acosh();
    
    // acosh(3) = ln(3 + sqrt(8)) ≈ 1.7627471740390859, im = 0
    const expected = Math.log(3 + Math.sqrt(8));
    
    // In mutated code, result.re will be NaN
    expect(Number.isFinite(result.re)).toBe(true);
    expect(result.re).toBeCloseTo(expected, 5);
    expect(result.im).toBeCloseTo(0, 5);
  });
});