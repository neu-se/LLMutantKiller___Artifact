import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asech', () => {
  it('should return correct imaginary part when d is 0 but b is non-zero (subnormal underflow)', () => {
    // Use a very small number where b*b underflows to 0, making d = 0
    // but b itself is non-zero
    const tiny = 5e-324; // smallest positive float (subnormal)
    const c = new Complex(0, tiny);
    const result = c.asech();
    // Original: imaginary part uses -b/0 = -Infinity
    // Mutated: imaginary part uses 0
    expect(result.im).not.toBe(0);
  });
});