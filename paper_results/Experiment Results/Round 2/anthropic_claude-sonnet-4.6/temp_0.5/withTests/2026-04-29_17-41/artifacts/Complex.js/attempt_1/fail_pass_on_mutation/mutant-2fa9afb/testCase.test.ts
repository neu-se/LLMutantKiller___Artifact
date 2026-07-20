import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex pow mutation detection', () => {
  it('should correctly compute pow for non-zero complex base', () => {
    // (2 + 3i)^2 = 4 + 12i - 9 = -5 + 12i
    const result = new Complex(2, 3).pow(new Complex(2, 0));
    
    // With the mutation, pow always returns ZERO when the condition is `if (true)`
    // Original: only returns ZERO when a === 0 && b === 0 && z['re'] > 0 && z['im'] >= 0
    expect(result.re).toBeCloseTo(-5, 10);
    expect(result.im).toBeCloseTo(12, 10);
  });
});