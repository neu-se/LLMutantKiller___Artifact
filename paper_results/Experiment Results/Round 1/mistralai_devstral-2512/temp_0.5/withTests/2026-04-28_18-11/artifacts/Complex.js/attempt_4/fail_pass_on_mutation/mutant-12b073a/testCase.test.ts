// Test case to detect the mutation in the sinh function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sinh function mutation test', () => {
  it('should correctly compute sinh for a value where the mutation would cause a significant difference', () => {
    const z = new Complex(2, 0);
    const result = z.sinh();

    // The correct formula is (e^x - e^-x)/2
    // The mutation changes it to (e^x - e^-x)/0.5 which equals (e^x - e^-x)*2
    // For x=2: correct ≈ 3.62686, mutated ≈ 7.25372

    const expectedRe = (Math.exp(2) - Math.exp(-2)) * 0.5;
    const expectedIm = 0;

    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);

    // This should fail on mutated version
    const mutatedValue = (Math.exp(2) - Math.exp(-2)) * 2;
    expect(result.re).not.toBeCloseTo(mutatedValue, 10);
  });
});