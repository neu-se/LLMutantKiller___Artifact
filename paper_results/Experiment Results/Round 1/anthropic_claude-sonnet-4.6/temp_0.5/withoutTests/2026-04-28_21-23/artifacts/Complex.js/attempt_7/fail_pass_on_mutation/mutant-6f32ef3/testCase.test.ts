import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should produce correct string for 1+1i showing space formatting', () => {
    const c = new Complex(1, 1);
    const str = c.toString();
    expect(str).toBe('1 + i');
  });
});