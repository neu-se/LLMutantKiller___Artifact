import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acosh', () => {
  it('should have finite imaginary part for acosh(-2) when else branch is taken', () => {
    // acos(-2) has positive imaginary part (~1.317i), triggering the else branch
    // Original: res['im'] = -res['re'] (finite value)
    // Mutated: res['im'] = -res[""] = NaN
    const result = new Complex(-2, 0).acosh();
    expect(isNaN(result.im)).toBe(false);
    expect(isFinite(result.im)).toBe(true);
  });
});