import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acosh', () => {
  it('should return correct imaginary part for acosh(-2) using the else branch', () => {
    // acosh(-2) triggers the else branch (res.im > 0 after acos)
    // Original: res['im'] = -res['re'] (a finite number)
    // Mutated:  res['im'] = -res[""] = -undefined = NaN
    
    const result = new Complex(-2, 0).acosh();
    
    // In original code, im should be exactly -re (swapped), giving a finite value
    // In mutated code, im becomes NaN
    // Check the imaginary part is a specific finite value
    const expected_im = Math.log(2 + Math.sqrt(3)); // ≈ 1.3169578969248166
    expect(result.im).toBeCloseTo(expected_im, 10);
  });
});