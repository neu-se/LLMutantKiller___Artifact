import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should format complex number with negative imaginary part correctly showing minus sign', () => {
    const c = new Complex(1, -2);
    expect(c.toString()).toBe('1 - 2i');
  });
});