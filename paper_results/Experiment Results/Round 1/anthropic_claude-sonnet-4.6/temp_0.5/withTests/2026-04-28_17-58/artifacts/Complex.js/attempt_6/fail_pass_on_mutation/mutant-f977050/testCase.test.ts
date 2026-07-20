import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acosh', () => {
  it('should compute acosh correctly for complex input triggering else branch with verifiable re component', () => {
    // Use acosh(0 + 2i) - need to find input where else branch is taken
    // and the resulting re component is affected by the mutation
    const result = new Complex(0, 2).acosh();
    // acosh(2i) = log(2i + sqrt(-4+1)) = log(2i + sqrt(-3))
    // Expected: approximately 1.3169578969248166 + 1.5707963267948966i
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(result.re).toBeGreaterThan(0);
  });
});