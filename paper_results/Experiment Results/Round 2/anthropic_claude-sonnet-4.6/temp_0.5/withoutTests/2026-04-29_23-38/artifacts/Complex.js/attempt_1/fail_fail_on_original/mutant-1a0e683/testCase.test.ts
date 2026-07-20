import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with zero base and real positive exponent", () => {
  it("should return Complex.ZERO when base is 0+0i and exponent is positive real (im === 0)", () => {
    // When base is 0+0i (a=0, b=0) and exponent has z['re'] > 0 and z['im'] === 0
    // Original code: z['im'] >= 0 => this branch is taken, returns Complex.ZERO
    // Mutated code: z['im'] > 0 => when z['im'] === 0, branch is NOT taken, falls through to general formula
    // which would compute exp(z['re'] * logHypot(0, 0)) = exp(-Infinity) = 0, but atan2(0,0) = 0
    // Actually let's verify: with a=0, b=0, logHypot(0,0) = log(0) = -Infinity
    // exp(z['re'] * (-Infinity) - 0) = exp(-Infinity) = 0
    // So the general formula would give 0 * cos(0) = 0, 0 * sin(0) = 0
    // But the original returns Complex.ZERO directly
    // The key difference: with mutated code, when z['im'] === 0 exactly, it falls through
    // Let's use a case where z['re'] > 0 and z['im'] === 0 exactly
    // The original returns Complex['ZERO'] (the singleton), mutated falls through to general formula
    // With a=0, b=0: logHypot(0,0) = log(0) = -Infinity
    // exp(2 * (-Infinity) - 0 * 0) = exp(-Infinity) = 0
    // cos(0 * (-Infinity) + 2 * 0) = cos(0) = 1
    // Result: 0 * 1 = 0, 0 * 0 = 0 => still 0+0i
    // Hmm, both might give 0. Let me think more carefully...
    // Actually NaN could occur: 0 * (-Infinity) = NaN
    // So mutated: exp(NaN) = NaN, NaN * cos(NaN) = NaN => result is NaN
    // Original: returns Complex.ZERO = 0+0i
    
    const base = new Complex(0, 0);
    const result = base.pow(2, 0); // 0^2 with real exponent 2
    
    // Original should return Complex.ZERO (0+0i), not NaN
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
    expect(result.isNaN()).toBe(false);
  });
});