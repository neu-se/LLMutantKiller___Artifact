import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acosh', () => {
  it('should correctly compute acosh(-2i)', () => {
    const z = new Complex(0, -2);
    const result = z.acosh();
    // acosh(-2i) should have negative imaginary part
    // With mutation (always if branch), result will be wrong
    expect(result.im).toBeLessThan(0);
  });
});