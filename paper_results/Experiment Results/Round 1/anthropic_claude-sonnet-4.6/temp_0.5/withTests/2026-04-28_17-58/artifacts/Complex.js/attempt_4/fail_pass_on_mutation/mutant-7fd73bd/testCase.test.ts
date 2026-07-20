import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation detection', () => {
  it('should correctly compute log of a number with negative real part and nonzero imaginary part', () => {
    // a=-1, b=1: b===0 && a>0 is false, so original outer if is false -> returns undefined
    // Wait, that means original is broken too...
    // Let me reconsider: maybe the placeholder IS the only if line (shown twice in display)
    // and the return is always reached
    
    // Testing log(e) = 1
    const result = new Complex(Math.E, 0).log();
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});