import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should produce correct string for number with zero real and zero imaginary', () => {
    // Force -0 for imaginary part through computation
    const c = new Complex(0, 1);
    const result = c.mul(new Complex(1, 0)); // 0 + 1i * 1 = 0 + 1i
    // Try to get a case where im becomes -0
    const d = new Complex(0, -0);
    expect(d.toString()).toBe('0');
  });
});