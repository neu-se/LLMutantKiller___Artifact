import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should not add space before imaginary part when real part is zero', () => {
    const c = new Complex(0, 2);
    expect(c.toString()).toBe('2i');
  });
});