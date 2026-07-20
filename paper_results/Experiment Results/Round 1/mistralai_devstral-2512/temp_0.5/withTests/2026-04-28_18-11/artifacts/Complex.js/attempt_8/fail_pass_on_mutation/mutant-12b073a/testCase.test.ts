// Test case to detect the mutation in the sinh function
import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sinh function mutation test', () => {
  it('should correctly compute sinh for a value where the mutation would cause a significant difference', () => {
    const z = new Complex(1, 0);
    const result = z.sinh();

    // The correct formula is (e^x - e^-x)/2
    // The mutation changes it to (e^x - e^-x)/0.5 which equals (e^x - e^-x)*2
    // For x=1: correct ≈ 1.1752, mutated ≈ 2.3504

    // Test the exact value that would be different
    expect(result.re).toBeCloseTo(1.1752011936438014, 10);
    expect(result.im).toBe(0);

    // This assertion will fail on mutated version
    expect(result.re).toBeLessThan(1.2);
  });
});