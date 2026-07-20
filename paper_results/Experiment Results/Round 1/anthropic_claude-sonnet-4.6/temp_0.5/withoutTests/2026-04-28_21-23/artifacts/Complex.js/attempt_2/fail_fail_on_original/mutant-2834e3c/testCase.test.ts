import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech', () => {
  it('should return non-zero imaginary part for asech of tiny imaginary number where d underflows', () => {
    const tiny = 5e-324; // smallest subnormal: tiny*tiny === 0 (underflow)
    const c = new Complex(0, tiny);
    const result = c.asech();
    // Original: passes Complex(0, -Infinity) to acosh => result has non-zero re
    // Mutated: passes Complex(0, 0) to acosh => result is acosh(0) = PI/2
    // The two results should differ significantly
    const originalExpected = new Complex(0, -Infinity).acosh();
    expect(result.re).toBeCloseTo(originalExpected.re, 5);
  });
});