import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow', () => {
  it('should return 0 when raising (0+0i) to the power of (2+0i)', () => {
    const result = new Complex(0, 0).pow(new Complex(2, 0));
    expect(result.re).toEqual(expect.any(Number));
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});