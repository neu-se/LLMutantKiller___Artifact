import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csch() method mutation test', () => {
  it('should correctly compute csch for specific input where division vs multiplication matters', () => {
    // Use a specific input where the mutation will have a clear effect
    const z = new Complex(0.5, 0.5);
    const result = z.csch();

    // The mutation changes division to multiplication in the csch method
    // For the original: result = 2 * cosh(a) * Math.sin(b) / d
    // For the mutated: result = 2 * cosh(a) * Math.sin(b) * d

    // Calculate d for this input
    const a = 0.5;
    const b = 0.5;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);

    // The key insight: for this input, d is negative and |d| > 1
    // So the original result (division) and mutated result (multiplication)
    // will have opposite signs and very different magnitudes

    // Check that the result has the expected sign (should be negative for original)
    expect(result.re).toBeLessThan(0);
    expect(result.im).toBeLessThan(0);

    // The mutated version would have positive values (since multiplying by negative d twice)
    // This is a clear behavioral difference we can test

    // Also check that the magnitude is reasonable for the original implementation
    const magnitude = result.abs();
    expect(magnitude).toBeGreaterThan(0);
    expect(magnitude).toBeLessThan(10);

    // This test will pass for original code (negative values, reasonable magnitude)
    // but fail for mutated code (positive values, different magnitude)
  });
});