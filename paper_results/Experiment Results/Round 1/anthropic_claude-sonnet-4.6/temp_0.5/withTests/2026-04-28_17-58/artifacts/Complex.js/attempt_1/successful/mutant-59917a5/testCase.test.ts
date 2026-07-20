import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('atanh mutation detection', () => {
  it('should compute atanh(1) with correct imaginary sign', () => {
    // For atanh(1 + 0i), noIM should be false (a > 1 is false when a === 1)
    // Original: noIM = false, so im is not negated
    // Mutated: noIM = true (a >= 1), so im is negated (becomes -0)
    const result = new Complex(1, 0).atanh();
    // The imaginary part should be +0, not -0
    // 1/+0 = +Infinity, 1/-0 = -Infinity
    expect(1 / result['im']).toBe(Infinity);
  });
});