// Test case to detect the mutation in the sinh function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sinh function mutation test', () => {
  it('should correctly compute sinh for a value where the mutation would cause a significant difference', () => {
    const z = new Complex(1, 0);
    const result = z.sinh();

    // The correct formula is (e^x - e^-x)/2
    // The mutation changes it to (e^x - e^-x)*0.5 which is equivalent to (e^x - e^-x)/2
    // Wait, these are actually mathematically equivalent! The mutation doesn't change behavior.

    // Let me test the actual sinh implementation directly
    const testValue = 1;
    const correctSinh = (Math.exp(testValue) - Math.exp(-testValue)) * 0.5;
    const mutatedSinh = (Math.exp(testValue) - Math.exp(-testValue)) / 0.5;

    // These should be different - correct is ~1.175, mutated is ~2.350
    expect(result.re).toBeCloseTo(correctSinh, 10);
    expect(result.re).not.toBeCloseTo(mutatedSinh, 10);
  });
});