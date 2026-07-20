import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acosh', () => {
  it('should correctly compute acosh for a negative real number where acos gives positive imaginary part', () => {
    // acosh(-2) should give approximately 1.3169578969248166 + π*i
    // acos(-2) has positive imaginary part, triggering the else branch
    // Mutation: res['im'] = -res[""] = NaN instead of res['im'] = -res['re']
    const result = new Complex(-2, 0).acosh();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeCloseTo(1.3169578969248166, 5);
    expect(result.im).toBeCloseTo(Math.PI, 5);
  });
});