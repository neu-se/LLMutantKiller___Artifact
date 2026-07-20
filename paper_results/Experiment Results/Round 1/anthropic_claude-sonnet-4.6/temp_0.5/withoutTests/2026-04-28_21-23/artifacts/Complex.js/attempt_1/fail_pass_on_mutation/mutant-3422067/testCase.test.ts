import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('hypot mutation detection', () => {
  it('should correctly compute abs for large equal-magnitude complex numbers', () => {
    const c = new Complex(4000, 4000);
    const result = c.abs();
    expect(result).toBeCloseTo(4000 * Math.sqrt(2), 10);
  });
});