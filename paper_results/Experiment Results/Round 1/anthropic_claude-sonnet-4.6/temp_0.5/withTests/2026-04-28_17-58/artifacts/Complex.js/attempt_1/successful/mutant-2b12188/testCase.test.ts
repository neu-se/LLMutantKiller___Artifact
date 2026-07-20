import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh mutation detection', () => {
  it('should correctly compute acosh for a real number greater than 1', () => {
    const c = new Complex(2, 0);
    const result = c.acosh();
    const expected = Math.acosh(2); // approximately 1.3169578969248166
    
    // With the mutation, res['re'] gets set to undefined (tmp = res[""] = undefined)
    // so result.re would be NaN or undefined instead of the correct value
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});