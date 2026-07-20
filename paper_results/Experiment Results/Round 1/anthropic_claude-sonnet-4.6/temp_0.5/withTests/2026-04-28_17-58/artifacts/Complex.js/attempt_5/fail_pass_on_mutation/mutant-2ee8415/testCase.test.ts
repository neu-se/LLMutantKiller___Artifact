import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return correct real part for acosh of negative imaginary number", () => {
    // For z = 0 - 2i, acos should have positive imaginary part, triggering else branch
    // In else branch (original): tmp = res.im; res.im = -res.re; res.re = tmp
    // In mutant: res[""] = tmp, so res.re stays as original acos.re instead of acos.im
    const c = new Complex(0, -2);
    const acos = c.acos();
    
    // acos(0-2i) should have positive im, triggering else branch
    // Original result.re = acos.im, mutant result.re = acos.re (wrong)
    const result = c.acosh();
    
    // Verify using cosh(acosh(z)) = z
    const check = result.cosh();
    expect(check.re).toBeCloseTo(0, 8);
    expect(check.im).toBeCloseTo(-2, 8);
  });
});