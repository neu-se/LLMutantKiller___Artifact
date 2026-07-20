import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csch() method mutation test', () => {
  it('should detect the division vs multiplication mutation in csch calculation', () => {
    // Test with a specific input where the mutation will have a clear effect
    const z = new Complex(0.5, 0.5);
    const result = z.csch();

    // Calculate the denominator d that's used in the csch calculation
    const a = 0.5;
    const b = 0.5;
    const d = Math.cos(2 * b) - Math.cosh(2 * a);

    // For the original code: result = 2 * cosh(a) * Math.sin(b) / d
    // For the mutated code: result = 2 * cosh(a) * Math.sin(b) * d

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
    expect(actual_magnitude).toBeCloseTo(original_magnitude, 5);

    // The mutated version would have a much larger magnitude
    // This difference is what we're testing for
    expect(actual_magnitude).toBeLessThan(mutated_magnitude / 10);

    // This test will pass for original code but fail for mutated code
    // because the mutated version would produce a much larger result
  });
});