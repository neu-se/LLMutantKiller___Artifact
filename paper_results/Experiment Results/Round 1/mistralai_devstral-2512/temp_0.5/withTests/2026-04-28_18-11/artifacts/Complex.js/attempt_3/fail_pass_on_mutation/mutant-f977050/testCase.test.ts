import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh method', () => {
  it('should return a valid complex number for acosh(1+1i)', () => {
    const c = new Complex(1, 1);
    const result = c.acosh();
    // The mutation causes res['im'] to be NaN when accessing res[""]
    // This test verifies the result is a valid complex number
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});