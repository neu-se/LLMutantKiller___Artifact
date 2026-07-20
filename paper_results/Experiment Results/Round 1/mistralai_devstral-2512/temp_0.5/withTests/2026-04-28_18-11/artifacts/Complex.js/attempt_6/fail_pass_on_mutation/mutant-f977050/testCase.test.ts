import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh method', () => {
  it('should not produce NaN imaginary part for valid input', () => {
    const c = new Complex(1.5, 1);
    const result = c.acosh();
    // The mutation changes res['im'] = -res['re'] to res['im'] = -res[""]
    // This will cause res['im'] to be NaN in the mutated version
    expect(isNaN(result.im)).toBe(false);
    // Also verify the result is a valid complex number
    expect(result).toBeInstanceOf(Complex);
  });
});