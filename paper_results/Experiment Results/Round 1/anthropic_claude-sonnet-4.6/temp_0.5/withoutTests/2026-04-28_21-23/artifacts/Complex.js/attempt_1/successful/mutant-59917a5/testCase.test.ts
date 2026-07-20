import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('atanh mutation detection', () => {
  it('should compute atanh(1) with correct imaginary part sign', () => {
    // For a=1, b=0: original has noIM = false (1 > 1 is false)
    // mutated has noIM = true (1 >= 1 is true), negating im
    const result = new Complex(1, 0).atanh();
    // The imaginary part should be 0 (not -0) for atanh(1)
    expect(Object.is(result['im'], 0)).toBe(true);
  });
});