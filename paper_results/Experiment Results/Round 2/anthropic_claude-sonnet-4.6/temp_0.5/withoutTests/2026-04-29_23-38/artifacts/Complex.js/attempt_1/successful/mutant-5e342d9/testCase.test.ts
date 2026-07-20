import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex abs with large values', () => {
  it('should correctly compute the absolute value of a complex number with large components', () => {
    // Both components >= 3000, re >= im, so the a >= b branch is taken
    // hypot(4000, 3000) should be 5000
    const c = new Complex(3000, 4000);
    const result = c.abs();
    expect(result).toBeCloseTo(5000, 5);
  });
});