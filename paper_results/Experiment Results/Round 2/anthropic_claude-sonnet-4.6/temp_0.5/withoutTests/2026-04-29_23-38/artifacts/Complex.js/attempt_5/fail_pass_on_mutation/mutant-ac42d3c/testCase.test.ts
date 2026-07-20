import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan', () => {
  it('should return a Complex with re=0 and im=-Infinity for input (0, -1)', () => {
    const c = new Complex(0, -1);
    const result = c.atan();
    expect(result).toBeInstanceOf(Complex);
    expect(Object.is(result.re, 0) || Object.is(result.re, -0)).toBe(true);
    expect(result.im).toBe(-Infinity);
    // The original returns Complex(0, -Infinity) directly (isInfinite = true, isNaN = false)
    // Mutated falls through computation - verify NaN status
    expect(result.isNaN()).toBe(false);
    expect(result.isInfinite()).toBe(true);
  });
});