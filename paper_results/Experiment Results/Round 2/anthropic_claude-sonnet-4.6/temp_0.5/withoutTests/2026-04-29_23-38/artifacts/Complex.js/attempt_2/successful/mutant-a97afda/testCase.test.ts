import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex atan', () => {
  it('should return 0 for atan(0+0i), not infinity', () => {
    const c = new Complex(0, 0);
    const result = c.atan();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
  });
});