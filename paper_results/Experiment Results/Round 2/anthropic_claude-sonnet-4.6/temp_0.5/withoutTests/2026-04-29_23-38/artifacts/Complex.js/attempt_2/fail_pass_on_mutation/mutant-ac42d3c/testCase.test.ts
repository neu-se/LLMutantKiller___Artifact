import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan special case', () => {
  it('should return Complex(0, -Infinity) for atan of Complex(0, -1) without going through division by zero', () => {
    // With a=0, b=-1: d = 0 + (1-(-1))^2 = 4, so no division by zero
    // Both paths produce same result - test the isInfinite property
    const c = new Complex(0, -1);
    const result = c.atan();
    // The result should have im = -Infinity
    expect(isFinite(result.im)).toBe(false);
    expect(result.im).toBe(-Infinity);
    expect(result.re).toBe(0);
    // Verify it's recognized as infinite
    expect(result.isInfinite()).toBe(true);
  });
});