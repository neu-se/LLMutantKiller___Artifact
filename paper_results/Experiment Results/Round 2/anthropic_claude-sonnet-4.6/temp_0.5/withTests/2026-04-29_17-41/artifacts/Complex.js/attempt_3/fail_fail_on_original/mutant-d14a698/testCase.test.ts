import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec', () => {
  it('should compute asec correctly when d underflows with both a and b being tiny positive values', () => {
    // a = Number.MIN_VALUE, b = Number.MIN_VALUE
    // d = a*a + b*b underflows to 0, but a !== 0 and b !== 0
    // original: new Complex(Infinity, -Infinity).acos()
    // mutated:  new Complex(Infinity, +Infinity).acos()
    const c = new Complex(Number.MIN_VALUE, Number.MIN_VALUE);
    const result = c.asec();
    const originalExpected = new Complex(Infinity, -Infinity).acos();
    const mutatedExpected = new Complex(Infinity, Infinity).acos();
    // Verify original and mutated give different results
    expect(originalExpected.re).not.toBeCloseTo(mutatedExpected.re, 5);
    // Result should match original
    expect(result.re).toBeCloseTo(originalExpected.re, 5);
    expect(result.im).toBeCloseTo(originalExpected.im, 5);
  });
});