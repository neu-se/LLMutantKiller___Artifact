import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acosh", () => {
  it("should return non-NaN imaginary part for acosh(-2)", () => {
    // For real input < -1, acos returns im > 0, triggering the else branch
    // Original: res['im'] = -res['re'] (valid number)
    // Mutated:  res['im'] = -res[""]  = NaN
    const result = new Complex(-2, 0).acosh();
    
    // In original code, acosh(-2) = log(2+sqrt(3)) + i*pi
    // im should be Math.PI, not NaN
    expect(isNaN(result.im)).toBe(false);
    expect(result.im).toBeCloseTo(Math.PI, 10);
  });
});