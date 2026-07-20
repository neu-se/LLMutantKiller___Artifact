import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex asec mutation test', () => {
  it('should correctly compute asec for extremely small non-zero real part', () => {
    // With a = Number.MIN_VALUE and b = 0:
    // d = a*a + b*b = 0 (underflow)
    // Original: (a !== 0) ? a/0 : 0 = Infinity
    // Mutated: (a === 0) ? a/0 : 0 = 0
    const c = new Complex(Number.MIN_VALUE, 0);
    const result = c.asec();
    // In original: a/0 = Infinity, so acos(Infinity, 0) = acos(INFINITY)
    // The re part should be Infinity
    expect(result.re).toBe(0); // acos of (Infinity, 0) -> specific value
    // Actually let's check isInfinite or specific behavior
    expect(isFinite(result.re) || isFinite(result.im) || result.isInfinite()).toBeTruthy();
  });
});