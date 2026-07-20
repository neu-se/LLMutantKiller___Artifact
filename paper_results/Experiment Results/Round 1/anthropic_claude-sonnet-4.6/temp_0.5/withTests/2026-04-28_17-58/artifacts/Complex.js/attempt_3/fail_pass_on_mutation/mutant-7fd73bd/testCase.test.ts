import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation detection', () => {
  it('should correctly compute log for purely imaginary input', () => {
    // log(0 + 2i): a=0, b=2
    // b === 0 is false, a > 0 is false
    // Original (&&): condition false, no-op if block, returns logHypot(0,2), atan2(2,0)
    // Mutated (||): same result since body is commented out
    // Need different approach - test logHypot behavior difference
    
    // log(3 + 0i): a=3, b=0 -> logHypot(3,0) = log(3), atan2(0,3) = 0
    const result = new Complex(3, 0).log();
    expect(result.re).toBeCloseTo(Math.log(3), 10);
    expect(result.im).toBeCloseTo(0, 10);
    
    // Verify the imaginary part is exactly 0, not -0 or something else
    expect(Object.is(result.im, -0)).toBe(false);
  });
});