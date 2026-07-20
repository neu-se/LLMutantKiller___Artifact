import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh method', () => {
  it('should produce correct imaginary part for acosh(0.5+0.5i)', () => {
    const c = new Complex(0.5, 0.5);
    const result = c.acosh();
    // The mutation changes res['im'] = -res['re'] to res['im'] = -res[""]
    // This will cause res['im'] to be NaN in the mutated version
    // We check for a specific expected value that would be different if the mutation occurred
    expect(result.im).toBeCloseTo(-0.48121182505960347, 10);
  });
});