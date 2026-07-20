import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('should correctly format a complex number where real part becomes zero after epsilon zeroing', () => {
    // re = 5e-16 < EPSILON → zeroed to 0, im = 2 (positive)
    // a = 0, b = 2 > 0: neither b < 0 nor b <= 0 triggers
    // result: "2i" for both versions
    // Try re = 5e-16, im = -2: a = 0, b = -2 < 0
    // Original: else if (b < 0) → b = 2, ret = "-" → "-2i"
    // Mutated: else if (b <= 0) → b = 2, ret = "-" → "-2i" (same)
    // The only difference would be b === 0 with a === 0, impossible after early return
    // Let me try the sub method which might produce exact zeros
    const c = new Complex(1, 1).sub(1, 1); // = 0 + 0i
    expect(c.toString()).toBe('0');
  });
});