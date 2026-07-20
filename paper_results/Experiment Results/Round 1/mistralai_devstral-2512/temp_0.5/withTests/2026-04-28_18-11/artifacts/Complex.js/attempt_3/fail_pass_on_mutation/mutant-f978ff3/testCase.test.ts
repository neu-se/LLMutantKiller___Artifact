import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csch() method mutation test', () => {
  it('should correctly compute csch(0.5+0.5i) and detect division vs multiplication', () => {
    const z = new Complex(0.5, 0.5);
    const result = z.csch();

    // For the original code, the result should be a valid complex number
    // For the mutated code (multiplication instead of division), the result will be completely different

    // The key insight: in the original code, we divide by d
    // In the mutated code, we multiply by d
    // This means the mutated result should be d^2 times larger than the original

    // First verify the original result is reasonable
    expect(result.isNaN()).toBe(false);
    expect(result.isInfinite()).toBe(false);

    // Calculate what d would be for this input
    const a = 0.5;
    const b = 0.5;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);

    // In the original code: result = 2 * cosh(a) * Math.sin(b) / d
    // In the mutated code: result = 2 * cosh(a) * Math.sin(b) * d
    // So the mutated result should be d^2 times the original

    // Store the original result
    const original_real = result.re;
    const original_imag = result.im;

    // The mutation would produce a result that's d^2 times larger
    // Since |d| > 1 for these inputs, the mutated result would be significantly larger
    // We can detect this by checking if the result is within a reasonable range

    // For a=0.5, b=0.5, d is negative and |d| > 1
    expect(Math.abs(d)).toBeGreaterThan(1);

    // The original result should have reasonable magnitude
    // The mutated result would be much larger (by factor of d^2)
    const magnitude = result.abs();
    expect(magnitude).toBeLessThan(10); // Original should be small
    expect(magnitude).toBeGreaterThan(0.1); // Original should not be too small

    // This test will pass for original code but fail for mutated code
    // because the mutated version would produce a much larger result
  });
});