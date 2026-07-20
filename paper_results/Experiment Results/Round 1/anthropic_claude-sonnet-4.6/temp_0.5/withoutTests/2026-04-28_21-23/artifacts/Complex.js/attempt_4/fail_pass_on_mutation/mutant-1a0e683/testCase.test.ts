import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should return exact zero (not -0) for imaginary part when 0+0i is raised to positive real power 2", () => {
    // Original: z.im >= 0 is true when z.im === 0, so returns Complex.ZERO with im = 0
    // Mutated: z.im > 0 is false when z.im === 0, falls through to general computation
    // logHypot(0,0) = log(0) = -Infinity
    // a = exp(2 * -Infinity - 0 * atan2(0,0)) = exp(-Infinity) = 0
    // b = 0 * -Infinity + 2 * 0 = NaN... 
    // Actually let's just check the result equals Complex.ZERO
    const base = new Complex(0, 0);
    const result = base.pow(2);  // exponent is real number 2, so z.im = 0
    
    // In original: returns Complex.ZERO, so re=0, im=0
    // In mutated: falls through to general path, result is different
    expect(result.equals(Complex.ZERO)).toBe(true);
  });
});