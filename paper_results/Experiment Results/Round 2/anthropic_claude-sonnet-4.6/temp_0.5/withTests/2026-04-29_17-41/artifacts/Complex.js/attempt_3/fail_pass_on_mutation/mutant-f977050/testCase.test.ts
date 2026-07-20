import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should correctly compute acosh for input where acos has positive imaginary part", () => {
    // For z = 2 (real > 1), acos(2) has negative imaginary part, takes if branch
    // For z = -2 (real < -1), acos(-2) has positive imaginary part, takes else branch
    // In else branch: original sets res['im'] = -res['re'], mutated sets res['im'] = NaN
    const result = new Complex(-2, 0).acosh();
    
    // acosh(-2) should have im = pi
    const expected = Math.PI;
    expect(result.im).not.toBeNaN();
    expect(Math.abs(result.im - expected)).toBeLessThan(1e-10);
  });
});