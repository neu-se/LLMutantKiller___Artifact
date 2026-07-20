import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should return exactly ZERO (not NaN) when raising 0+0i to a positive real power with im=0", () => {
    // The mutation changes z['im'] >= 0 to z['im'] > 0
    // When z['im'] === 0 exactly, original returns Complex.ZERO
    // Mutated falls through to general formula where logHypot(0,0) = log(0) = -Infinity
    // Then: exp(z['re'] * -Infinity - 0 * atan2(0,0)) = exp(-Infinity) = 0
    // b = 0 * -Infinity + z['re'] * 0 = NaN + 0 = NaN
    // cos(NaN) = NaN, sin(NaN) = NaN => result is NaN
    
    const base = new Complex(0, 0);
    // Use a non-integer positive real exponent to avoid special cases
    const result = base.pow(new Complex(0.5, 0));
    
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});