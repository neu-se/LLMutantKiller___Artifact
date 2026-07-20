import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex exp', () => {
  it('should return a complex number where im is exactly 0 when input im is 0', () => {
    const result = new Complex(0, 0).exp();
    // exp(0) = 1, so re=1, im=0
    expect(result.re).toBe(1);
    expect(result.im).toBe(0);
    // Verify valueOf returns the real number (only works if im === 0)
    expect(result.valueOf()).toBe(1);
  });
});