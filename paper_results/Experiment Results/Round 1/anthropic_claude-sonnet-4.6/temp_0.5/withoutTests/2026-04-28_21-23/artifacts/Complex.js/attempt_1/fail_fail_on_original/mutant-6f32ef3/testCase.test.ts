import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString with negative zero imaginary part', () => {
  it('should correctly format complex number with -0 imaginary part', () => {
    const c = new Complex(0, -0);
    expect(c.toString()).toBe('0i');
  });
});