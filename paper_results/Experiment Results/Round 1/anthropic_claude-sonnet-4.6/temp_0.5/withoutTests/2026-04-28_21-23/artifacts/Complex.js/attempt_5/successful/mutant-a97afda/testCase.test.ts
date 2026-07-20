import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan', () => {
  it('should compute atan(1 + 1i) correctly', () => {
    // When b=1, both original and mutated execute the if block
    // When b!=1, only mutated executes it
    // Need to find what the block does when b=1 that's wrong for b!=1
    const c = new Complex(0, 0.5);
    const result = c.atan();
    // atan(0 + 0.5i) = i * atanh(0.5) = i * 0.5493...
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0.5493061443340548, 5);
  });
});