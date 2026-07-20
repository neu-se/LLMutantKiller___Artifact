import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acosh', () => {
  it('should return a finite imaginary part for acosh(-2) where the else branch is taken', () => {
    // acos(-2) has positive imaginary part, so the else branch is taken in acosh
    // Original: res['im'] = -res['re'] → finite value (Math.PI)
    // Mutated: res['im'] = -res[""] = -undefined = NaN
    const result = new Complex(-2, 0).acosh();
    expect(result.im).toBeCloseTo(Math.PI, 5);
  });
});