import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sinh function', () => {
  it('should correctly compute sinh for a non-zero value', () => {
    const c = new Complex(0.5, 0);
    const result = c.sinh();
    // Original: (Math.exp(0.5) - Math.exp(-0.5)) * 0.5 ≈ 0.521095
    // Mutated: (Math.exp(0.5) - Math.exp(-0.5)) / 0.5 ≈ 2.08438
    expect(result.re).toBeCloseTo(0.521095, 5);
    expect(result.im).toBe(0);
  });
});