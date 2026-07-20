// Test case to detect the mutation in the sinh function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sinh function mutation test', () => {
  it('should correctly compute sinh for a value where the mutation would cause a significant difference', () => {
    // The mutation changes division by 0.5 to multiplication by 0.5
    // This means the mutated version will return values 4x larger than expected
    // We test with a value where this difference is clearly observable

    const z = new Complex(1, 0); // Real number 1
    const result = z.sinh();

    // Expected result using correct formula: (e^1 - e^-1)/2 ≈ 1.1752011936438014
    const expectedRe = (Math.exp(1) - Math.exp(-1)) * 0.5;
    const expectedIm = 0;

    // The mutation would give: (e^1 - e^-1) * 0.5 * 2 = (e^1 - e^-1) ≈ 2.3504023872876028
    // So we check that the result is NOT approximately 4x the expected value

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);

    // Additional check to ensure the mutation would fail:
    // The mutated version would produce a value ~4x larger
    const mutatedValue = (Math.exp(1) - Math.exp(-1)) * 2;
    expect(result.re).not.toBeCloseTo(mutatedValue, 10);
  });
});