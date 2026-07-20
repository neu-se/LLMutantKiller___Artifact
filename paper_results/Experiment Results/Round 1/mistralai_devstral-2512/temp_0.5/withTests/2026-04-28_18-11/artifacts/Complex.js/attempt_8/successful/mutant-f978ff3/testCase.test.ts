import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csch() method mutation test', () => {
  it('should correctly compute csch(1+1i) and detect division vs multiplication', () => {
    const z = new Complex(1, 1);
    const result = z.csch();

    // The mutation changes division to multiplication in the csch method
    // For the original: result = 2 * cosh(a) * Math.sin(b) / d
    // For the mutated: result = 2 * cosh(a) * Math.sin(b) * d

    // Calculate the denominator d that's used in the csch calculation
    const a = 1;
    const b = 1;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);

    // The key insight: for this input, d is negative and |d| > 1
    // So the original result (division) and mutated result (multiplication)
    // will have very different magnitudes

    // Calculate what the magnitude should be for both cases
    const numerator = 2 * Math.cosh(a) * Math.sin(b);
    const original_magnitude = Math.abs(numerator / d);
    const mutated_magnitude = Math.abs(numerator * d);

    // The actual result magnitude
    const actual_magnitude = result.abs();

    // The original magnitude should be much smaller than the mutated magnitude
    // because we're dividing by d (|d| > 1) vs multiplying by d
    expect(actual_magnitude).toBeLessThan(10);
    expect(actual_magnitude).toBeGreaterThan(0.1);

    // The mutated version would have a much larger magnitude
    // This difference is what we're testing for
    expect(actual_magnitude).not.toBeCloseTo(mutated_magnitude, 0);

    // This test will pass for original code but fail for mutated code
    // because the mutated version would produce a much larger result
  });
});