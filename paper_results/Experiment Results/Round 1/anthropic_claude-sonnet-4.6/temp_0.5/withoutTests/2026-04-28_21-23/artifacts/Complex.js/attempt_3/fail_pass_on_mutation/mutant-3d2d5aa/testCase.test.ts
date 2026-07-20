import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('detects mutation in acoth fallback with negative tiny a', () => {
    const tinyA = -5e-324; // negative subnormal; a*a === 0, so d === 0, but a !== 0
    const c = new Complex(tinyA, 0);
    const result = c.acoth();
    // Original: (a !== 0) ? a/0 : 0 => -Infinity (negative a / 0)
    // Mutant: (false) ? ... : 0 => 0
    // atanh(-Infinity, 0): noIM = false (a < 1), d = (1-(-Inf))^2 = Inf
    // Different from atanh(0, 0) = 0
    // Check imaginary part differs
    expect(result.im).not.toBe(0);
  });
});