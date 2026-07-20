import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sinh function', () => {
  it('should correctly compute sinh for a specific value where mutation causes failure', () => {
    const c = new Complex(1, 0);
    const result = c.sinh();
    // The mutation changes the formula from multiplying by 0.5 to dividing by 0.5
    // For x=1: original = (e^1 - e^-1)*0.5 ≈ 1.1752
    // mutated = (e^1 - e^-1)/0.5 ≈ 4.701
    // Using a tight tolerance to catch the mutation
    expect(result.re).toBeCloseTo(1.1752011936438014, 10);
    expect(result.im).toBe(0);
  });
});