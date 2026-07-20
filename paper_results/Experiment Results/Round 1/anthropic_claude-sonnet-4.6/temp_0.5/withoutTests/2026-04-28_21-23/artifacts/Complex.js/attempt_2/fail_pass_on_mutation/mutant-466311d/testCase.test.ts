import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('logHypot mutation detection', () => {
  it('should correctly compute log of complex number where _a >= 3000 and _b < 3000', () => {
    // With a=3000, b=1: _a=3000 is NOT < 3000, so original uses safe path
    // Mutated: true && _b < 3000 → uses naive path Math.log(a*a + b*b)*0.5
    // These differ in floating point precision
    const c = new Complex(3000, 1);
    const logResult = c.log();
    
    // Expected: logHypot(3000, 1) = log(sqrt(3000^2 + 1^2)) = log(sqrt(9000001))
    const expected = Math.log(Math.sqrt(9000001));
    
    expect(logResult.re).toBe(expected);
  });
});