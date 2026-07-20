import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh method', () => {
  it('should produce correct imaginary part for acosh(1.1+0.5i)', () => {
    const c = new Complex(1.1, 0.5);
    const result = c.acosh();
    // The mutation changes res['im'] = -res['re'] to res['im'] = -res[""]
    // This will cause res['im'] to be NaN in the mutated version
    // We check that the imaginary part is exactly equal to -res['re']
    // which would fail if the mutation occurred (since res[""] is undefined)
    expect(result.im).toBe(-result.re);
  });
});