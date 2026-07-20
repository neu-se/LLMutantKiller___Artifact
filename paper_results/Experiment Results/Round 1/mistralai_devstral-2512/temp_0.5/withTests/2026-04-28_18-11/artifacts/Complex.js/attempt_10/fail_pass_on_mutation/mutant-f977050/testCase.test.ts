import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh method', () => {
  it('should correctly handle the case where res.im > 0 in acosh', () => {
    // Create a complex number that will trigger the res.im > 0 branch
    const c = new Complex(0.5, 0.5);
    const result = c.acosh();
    // The mutation changes res['im'] = -res['re'] to res['im'] = -res[""]
    // This will cause the imaginary part to be NaN in the mutated version
    // We check that the imaginary part is a valid number and not NaN
    expect(isNaN(result.im)).toBe(false);
    // Also verify the result is a valid complex number
    expect(result).toBeInstanceOf(Complex);
  });
});