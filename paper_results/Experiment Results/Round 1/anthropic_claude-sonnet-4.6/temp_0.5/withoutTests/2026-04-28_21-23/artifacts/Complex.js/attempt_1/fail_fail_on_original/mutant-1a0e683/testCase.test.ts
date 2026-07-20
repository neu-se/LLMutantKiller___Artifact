import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with zero base and positive real exponent", () => {
  it("should return ZERO when base is 0+0i and exponent is purely real positive (z.im === 0)", () => {
    // When base is 0+0i (a=0, b=0) and exponent has z.re > 0 and z.im === 0 (not > 0),
    // the original code enters the if block (z.im >= 0) and returns Complex.ZERO.
    // The mutated code uses z.im > 0, so when z.im === 0 it does NOT enter the block,
    // and falls through to compute exp(z.re * loh - z.im * arg) which involves log(0) = -Infinity,
    // resulting in NaN or 0 depending on the path.
    const base = new Complex(0, 0);
    const result = base.pow(new Complex(2, 0));
    
    // Original: returns Complex.ZERO (re=0, im=0)
    // Mutated: z.im === 0 is NOT > 0, so skips the block, computes logHypot(0,0) = log(0) = -Infinity
    // then a = exp(2 * -Infinity - 0 * atan2(0,0)) = exp(-Infinity) = 0
    // b = 0 * -Infinity + 2 * 0 = NaN (0 * -Infinity = NaN)
    // So result would be Complex(0 * cos(NaN), 0 * sin(NaN)) = Complex(NaN, NaN)
    
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});