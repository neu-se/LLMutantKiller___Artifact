import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh method', () => {
  it('should correctly compute acosh for complex number with positive imaginary part', () => {
    const c = new Complex(1.1, 0.5);
    const result = c.acosh();
    // The mutation changes res['im'] = -res['re'] to res['im'] = -res[""]
    // This will cause the imaginary part to be NaN in the mutated version
    // We verify the imaginary part is a finite number
    expect(Number.isFinite(result.im)).toBe(true);
    // Also verify the real part is finite
    expect(Number.isFinite(result.re)).toBe(true);
  });
});