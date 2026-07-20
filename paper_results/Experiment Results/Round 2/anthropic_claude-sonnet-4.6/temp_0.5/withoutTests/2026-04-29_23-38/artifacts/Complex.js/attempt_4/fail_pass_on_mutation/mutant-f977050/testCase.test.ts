import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acosh', () => {
  it('should return imaginary part equal to pi for acosh(-2)', () => {
    // acosh(-2) triggers the else branch (res.im > 0 after acos)
    // Original: tmp = res['re']; res['im'] = -res['re']; res['re'] = tmp;
    //   -> swaps re and im with negation, giving im = pi
    // Mutated:  res['im'] = -res[""] = -undefined = NaN
    //   -> im becomes NaN
    
    const result = new Complex(-2, 0).acosh();
    
    // In original code, im should be pi (≈ 3.14159...)
    expect(result.im).toBeCloseTo(Math.PI, 10);
    // Also verify it's not NaN (mutated code produces NaN)
    expect(isNaN(result.im)).toBe(false);
  });
});