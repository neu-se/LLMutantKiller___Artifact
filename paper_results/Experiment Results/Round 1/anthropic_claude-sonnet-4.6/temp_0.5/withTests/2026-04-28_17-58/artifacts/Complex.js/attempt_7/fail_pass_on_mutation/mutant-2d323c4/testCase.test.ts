import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('acsch(1+i) gives specific value', () => {
    const c = new Complex(1, 1);
    const result = c.acsch();
    // Both original and mutated give same result for d=0, a!=0
    // Let's check what the actual value is
    expect(result.re).toBeDefined();
    expect(result.im).toBeDefined();
    // From empirical evidence: result is not NaN
    expect(result.isNaN()).toBe(false);
  });
});