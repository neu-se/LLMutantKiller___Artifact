import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csch() method mutation test', () => {
  it('should detect division vs multiplication in csch calculation', () => {
    const z = new Complex(0.1, 0.1);
    const result = z.csch();

    // Calculate the denominator d that's used in the csch calculation
    const a = 0.1;
    const b = 0.1;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);

    // For the original code: result = 2 * cosh(a) * Math.sin(b) / d
    // For the mutated code: result = 2 * cosh(a) * Math.sin(b) * d
    // The key difference is division vs multiplication by d

    // Calculate what the result should be for both cases
    const numerator = 2 * Math.cosh(a) * Math.sin(b);
    const expected_original = numerator / d;
    const expected_mutated = numerator * d;

    // The actual result should match the original calculation
    // We'll check both real and imaginary parts
    expect(Math.abs(result.re - expected_original)).toBeLessThan(1e-10);
    expect(Math.abs(result.im - expected_original)).toBeLessThan(1e-10);

    // Additionally, verify the result is NOT equal to the mutated version
    // This ensures we're actually testing the division operation
    expect(Math.abs(result.re - expected_mutated)).toBeGreaterThan(1);
    expect(Math.abs(result.im - expected_mutated)).toBeGreaterThan(1);
  });
});