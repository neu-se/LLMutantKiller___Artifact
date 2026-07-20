import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('logHypot mutation detection', () => {
  it('detects mutation when _a is very large and _b is small', () => {
    // a = 1e200 (>= 3000), b = 1 (< 3000)
    // Original: _a >= 3000, _b < 3000 → safe path: a/2=5e199, b/2=0.5
    //   (5e199)^2 still overflows... need a in range where a^2 overflows but (a/2)^2 doesn't
    // a = 2e154: a^2 = 4e308 (overflows), (a/2)^2 = 1e308 (ok)
    const a = 2e154;
    const b = 1;
    // naive: Math.log(a*a + b*b) * 0.5 = Math.log(Infinity) * 0.5 = Infinity
    // safe: 0.5 * Math.log((a/2)^2 + (b/2)^2) + ln2 = finite value
    
    const c = new Complex(a, b);
    const result = c.log();
    
    expect(isFinite(result.re)).toBe(true);
    expect(result.re).toBeCloseTo(154 * Math.log(10) + Math.log(2), 5);
  });
});