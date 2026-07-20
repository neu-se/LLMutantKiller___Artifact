// Test case to detect mutation in csch method
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex.csch() method', () => {
  it('should correctly compute the hyperbolic cosecant of a complex number', () => {
    // Test with a specific complex number where we can verify the result
    const z = new Complex(1, 1);
    const result = z.csch();

    // The expected result for csch(1+i) can be computed as:
    // csch(1+i) = 2 / (e^(1+i) - e^(-1-i))
    // We'll verify the structure of the result rather than exact values
    // since the mutation changes division to multiplication

    // For the original code, the result should be a complex number
    // For the mutated code, the result will be significantly different
    // due to multiplication instead of division

    // We'll check that the result is not NaN and has reasonable magnitude
    expect(result.isNaN()).toBe(false);
    expect(result.isInfinite()).toBe(false);

    // The original implementation should produce a result with specific properties
    // Let's compute what we expect using the formula:
    // csch(a+bi) = 2 / (e^(a+bi) - e^(-a-bi))
    //            = 2 / [(e^a cos b + i e^a sin b) - (e^-a cos b + i e^-a sin b)]
    //            = 2 / [(e^a - e^-a) cos b + i (e^a + e^-a) sin b]

    // For a=1, b=1:
    const e = Math.E;
    const e_pow = e * e; // e^1
    const e_neg = 1 / e; // e^-1
    const cos_b = Math.cos(1);
    const sin_b = Math.sin(1);

    const denominator_real = (e_pow - e_neg) * cos_b;
    const denominator_imag = (e_pow + e_neg) * sin_b;
    const denominator_magnitude = denominator_real * denominator_real + denominator_imag * denominator_imag;

    // The magnitude of the result should be 2 / sqrt(denominator_magnitude)
    const expected_magnitude = 2 / Math.sqrt(denominator_magnitude);

    // Check that the actual result's magnitude is close to expected
    // (with some tolerance for floating point errors)
    const actual_magnitude = result.abs();
    expect(Math.abs(actual_magnitude - expected_magnitude)).toBeLessThan(1e-10);

    // The mutated version would multiply by d instead of dividing,
    // which would make the magnitude much larger (by d^2 factor)
    // This test should fail for the mutated version
  });
});