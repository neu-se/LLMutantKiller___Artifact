import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should format number with zeroed real part and negative imaginary part correctly', () => {
    // a = 1e-16 gets zeroed (< EPSILON), b = -1e-15 stays (not < EPSILON since |b| = EPSILON exactly)
    // After zeroing: a = 0, b = -1e-15
    // b !== 0, so no early return
    // a !== 0 is false, so goes to else if
    // Original: b < 0 → true → adds "-"
    // Mutated: b <= 0 → true → same
    // Both produce "-1e-15i"
    const c = new Complex(1e-16, -1e-15);
    expect(c.toString()).toBe('-1e-15i');
  });
});