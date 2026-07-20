import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex exp', () => {
  it('should compute exp(1 + i) correctly with non-zero imaginary part', () => {
    const z = new Complex(1, 1);
    const result = z.exp();
    // Mutated code returns new Complex(Math.exp(1), 0) instead of correct value
    expect(result.im).toBeCloseTo(Math.E * Math.sin(1), 10);
  });
});