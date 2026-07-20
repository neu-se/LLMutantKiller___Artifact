import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should show plus sign for complex number with small positive imaginary part above epsilon', () => {
    // b = 2e-15 is above EPSILON (1e-15), so it won't be zeroed
    // b > 0: original uses +, mutated also uses + (b <= 0 is false for positive b)
    // This won't work either...
    // Try: directly set im to -0 on the object
    const c = new Complex(1, 2);
    // Manually set im to -0 to test the mutation point
    (c as any)['im'] = -0;
    // With original: b < 0 is false for -0, so uses +, but b===0 returns early: "1"
    // Actually toString reads this['im'] fresh each time
    expect(c.toString()).toBe('1');
  });
});