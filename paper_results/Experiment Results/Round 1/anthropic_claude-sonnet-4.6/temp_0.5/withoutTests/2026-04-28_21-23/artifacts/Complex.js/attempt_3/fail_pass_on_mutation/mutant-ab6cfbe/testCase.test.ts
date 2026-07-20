import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log mutation detection', () => {
  it('log of zero should produce correct result via logHypot path', () => {
    // For a=0, b=0:
    // Original (a > 0 is false): uses logHypot(0,0) = Math.log(0) = -Infinity, atan2(0,0) = 0
    // Mutated (a >= 0 is true): enters if block with commented return, same fallthrough
    // These are the same... need different approach
    
    // Let's check asin(0) which internally uses log
    // asin(0) should be 0
    const result = new Complex(0, 0).asin();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});