import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec with subnormal inputs', () => {
  it('should compute asec with correct sign when d underflows to zero but b is nonzero', () => {
    // Use extremely small values so a*a + b*b underflows to 0
    // but b != 0, triggering the mutated branch
    const tiny = 5e-324; // Number.MIN_VALUE - smallest positive float
    const z = new Complex(0, tiny);
    const result = z.asec();
    // Original: (-tiny / 0) = -Infinity, so acos(0, -Infinity)
    // Mutated: (+tiny / 0) = +Infinity, so acos(0, +Infinity)
    // These should give different imaginary parts
    expect(result.im).toBeLessThan(0);
  });
});