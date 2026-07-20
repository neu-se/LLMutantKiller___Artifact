import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex sinh function', () => {
  it('should correctly compute sinh for a value where mutation causes significant difference', () => {
    const c = new Complex(2, 0);
    const result = c.sinh();
    // Original: (Math.exp(2) - Math.exp(-2)) * 0.5 ≈ 3.62686
    // Mutated: (Math.exp(2) - Math.exp(-2)) / 0.5 ≈ 14.5074
    // Using exact expected value to catch the mutation
    const expected = (Math.exp(2) - Math.exp(-2)) * 0.5;
    expect(result.re).toBe(expected);
    expect(result.im).toBe(0);
  });
});