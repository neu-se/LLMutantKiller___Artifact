import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with zero base and positive real exponent", () => {
  it("should not produce NaN when raising 0+0i to a positive real power", () => {
    // Original: condition is z['im'] >= 0, so when exponent is purely real (im=0)
    // with re > 0, returns Complex.ZERO
    // Mutated: condition is z['im'] > 0, so when exponent im === 0, falls through
    // to general formula: logHypot(0,0) = -Infinity, 0 * -Infinity = NaN => NaN result
    
    const base = new Complex(0, 0);
    const result = base.pow(new Complex(2, 0)); // 0^2 with purely real exponent
    
    // Original returns Complex.ZERO (not NaN)
    // Mutated falls through to general formula producing NaN
    expect(result.isNaN()).toBe(false);
  });
});