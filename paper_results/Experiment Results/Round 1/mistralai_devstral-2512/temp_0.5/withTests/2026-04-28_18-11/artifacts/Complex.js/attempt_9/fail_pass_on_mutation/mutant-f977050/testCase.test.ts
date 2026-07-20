import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh method', () => {
  it('should not produce undefined values in acosh result', () => {
    const c = new Complex(1.5, 0.5);
    const result = c.acosh();
    // The mutation changes res['im'] = -res['re'] to res['im'] = -res[""]
    // This will cause res['im'] to be NaN in the mutated version
    // We check that neither component is undefined
    expect(result.re).not.toBeUndefined();
    expect(result.im).not.toBeUndefined();
    // Also verify they are actual numbers
    expect(typeof result.re).toBe('number');
    expect(typeof result.im).toBe('number');
  });
});