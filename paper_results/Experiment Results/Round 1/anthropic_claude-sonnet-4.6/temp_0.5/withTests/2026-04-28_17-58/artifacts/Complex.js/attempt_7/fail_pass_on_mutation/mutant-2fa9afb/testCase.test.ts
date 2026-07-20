import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sinh', () => {
  it('sinh of a non-zero value returns non-zero result', () => {
    const c = new Complex(1, 0);
    const result = c.sinh();
    // sinh(1) ≈ 1.1752
    expect(result).toBeDefined();
    expect(result.re).toBeCloseTo(Math.sinh(1), 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});