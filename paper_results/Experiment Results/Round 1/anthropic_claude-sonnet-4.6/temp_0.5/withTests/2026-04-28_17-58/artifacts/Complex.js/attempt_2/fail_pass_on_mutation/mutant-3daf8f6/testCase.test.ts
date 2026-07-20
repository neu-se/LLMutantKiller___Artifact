import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('logHypot boundary at _a === 3000', () => {
  it('computes log accurately matching expected value for complex(3000, 1)', () => {
    // When _a = 3000 exactly and _b < 3000:
    // Original uses slow path (divides by 2 first)
    // Mutant uses fast path (direct computation)
    // Both should give same result - but let's verify the actual IEEE 754 values
    const c = new Complex(3000, 1);
    const result = c.log();
    // Compute expected using the slow path formula directly
    const a = 3000 / 2;
    const b = 1 / 2;
    const expected = 0.5 * Math.log(a * a + b * b) + Math.LN2;
    expect(result.re).toBe(expected);
  });
});