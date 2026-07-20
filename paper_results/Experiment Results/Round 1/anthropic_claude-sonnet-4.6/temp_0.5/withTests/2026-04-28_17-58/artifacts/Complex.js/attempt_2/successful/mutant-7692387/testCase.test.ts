import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asinh', () => {
  it('should not mutate the original complex number when computing asinh', () => {
    const c = new Complex(1, 2);
    c.asinh();
    // After asinh(), the original object should have its properties restored
    // In the mutated code, this['im'] is not restored (stays as -this['re'] = -1)
    expect(c.im).toBe(2);
  });
});