import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex toString', () => {
  it('log of -1 should give pi*i', () => {
    const result = new Complex(-1, 0).log();
    // log(-1) = pi*i, so re=0, im=pi
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Math.PI);
    // toString: a=0 (after epsilon zeroing), b=pi
    // Original: b < 0? No. Mutated: b <= 0? No. Same result.
    expect(result.toString()).toBe(Math.PI + 'i');
  });
});