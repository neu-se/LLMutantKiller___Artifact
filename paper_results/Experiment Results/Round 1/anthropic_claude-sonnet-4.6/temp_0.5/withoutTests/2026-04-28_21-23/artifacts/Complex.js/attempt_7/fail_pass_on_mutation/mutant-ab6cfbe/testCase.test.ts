import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log direct test', () => {
  it('log of zero should return complex with -Infinity real', () => {
    const logZero = new Complex(0, 0).log();
    expect(logZero.re).toBe(-Infinity);
    expect(logZero.im).toBe(0);
    
    // Now test that log of positive real uses correct formula
    // For a > 0, b = 0: logHypot(a, 0) = Math.log(a), atan2(0, a) = 0
    // Both original and mutated give same result here
    // The ONLY difference is a=0, b=0 case which gives same result too
    
    // Try log of number very close to 0
    const logSmall = new Complex(Number.MIN_VALUE, 0).log();
    expect(logSmall.re).toBeLessThan(0);
    expect(logSmall.im).toBeCloseTo(0, 10);
  });
});