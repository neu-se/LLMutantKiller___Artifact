import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan', () => {
  it('should return Infinity string representation for atan of (0, -1)', () => {
    const c = new Complex(0, -1);
    const result = c.atan();
    // Original returns new Complex(0, -Infinity) directly
    // Both paths should give same result, but let's verify toString
    expect(result.toString()).toBe('Infinity');
  });
});