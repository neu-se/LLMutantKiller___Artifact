import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should not prepend minus sign when imaginary part is zero and real part is zero', () => {
    const result = new Complex(0, 0).toString();
    expect(result).toBe('0');
    expect(result.startsWith('-')).toBe(false);
  });
});