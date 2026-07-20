import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex log', () => {
  it('log of positive real uses correct computation', () => {
    // For a > 0, b = 0:
    // logHypot(a, 0) goes through: b===0 branch → Math.log(|a|)
    // Math.log(a) for a > 0 is identical
    // BUT: what if we test a=0 specifically?
    // logHypot(0, 0): a===0 branch → Math.log(0) = -Infinity
    // Math.log(0) = -Infinity
    // atan2(0, 0) = 0 in both cases
    // Truly identical...
    
    // Let me try: does the mutation affect log(0) called via atanh?
    // atanh uses logHypot directly, not log()
    
    // What about acoth(0)?
    const result = new Complex(0, 0).acoth();
    expect(result.re).toBe(0);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});