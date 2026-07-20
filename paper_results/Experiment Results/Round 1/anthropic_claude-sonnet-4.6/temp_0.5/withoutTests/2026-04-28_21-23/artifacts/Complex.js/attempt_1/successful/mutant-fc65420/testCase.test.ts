import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acsch with real numbers', () => {
  it('should return the correct acsch for a non-zero real number', () => {
    // acsch(a) for real a != 0 should be log(a + sqrt(a^2 + 1))
    // The original code uses (a !== 0) ? Math.log(a + Math.sqrt(a * a + 1)) : Infinity
    // The mutated code uses (a === 0) ? Math.log(a + Math.sqrt(a * a + 1)) : Infinity
    // For a = 1 (non-zero): original returns log(1 + sqrt(2)), mutant returns Infinity
    const result = new Complex(1, 0).acsch();
    const expected = Math.log(1 + Math.sqrt(2));
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBe(0);
  });
});