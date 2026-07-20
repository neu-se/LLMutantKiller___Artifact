// Test case to detect the mutation in the acosh method
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh method', () => {
  it('should correctly compute acosh for a complex number with positive imaginary part', () => {
    const c = new Complex(2, 3);
    const result = c.acosh();
    // The mutation changes res['im'] = -res['re'] to res['im'] = -res[""]
    // This will cause res['im'] to be NaN (since res[""] is undefined)
    // So we check that the imaginary part is a valid number
    expect(result.im).toBeDefined();
    expect(typeof result.im).toBe('number');
    expect(isNaN(result.im)).toBe(false);
  });
});