import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex atan mutation detection', () => {
  it('atan of complex number with imaginary part 0.5 should not be infinite', () => {
    // For z = 0 + 0.5i, b=0.5 !== 1
    // Original: if(b===1) is false, normal finite computation
    // Mutated: if(true) always fires - returns early with wrong (possibly infinite) result
    const z = new Complex(0, 0.5);
    const result = z.atan();
    // atan(0.5i) should be purely imaginary: i * atanh(0.5)
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    // The real part should be 0 (or pi/2 depending on branch)
    // Key: result must NOT be infinite
    expect(result.isInfinite()).toBe(false);
  });
});