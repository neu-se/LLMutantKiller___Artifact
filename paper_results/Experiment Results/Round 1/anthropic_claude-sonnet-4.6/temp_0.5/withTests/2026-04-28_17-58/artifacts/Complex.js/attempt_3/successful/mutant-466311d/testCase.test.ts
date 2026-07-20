import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("logHypot mutation detection", () => {
  it("should correctly compute log for complex number with _a >= 3000 and _b < 3000 without overflow", () => {
    // a^2 overflows but (a/2)^2 does not
    // a = 2e154: a*a = 4e308 = Infinity, but (a/2)*(a/2) = 1e308 which is finite
    const a = 2e154;
    const b = 1;
    
    // Original: _a=2e154 >= 3000, _b=1 < 3000 -> uses safe path: (a/2)^2+(b/2)^2 is finite
    // Mutant: condition is (true && _b < 3000) -> uses fast path: a*a + b*b = Infinity
    
    const result = new Complex(a, b).log();
    const expected = Math.log(a); // log(sqrt(a^2+b^2)) ≈ log(a) since a >> b
    
    expect(isFinite(result.re)).toBe(true);
    expect(result.re).toBeCloseTo(expected, 5);
  });
});