import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul", () => {
  it("should correctly multiply two real numbers where general formula im computation differs from optimization", () => {
    // The optimization returns new Complex(this.re * z.re, 0) - literal 0 for im
    // The general formula returns im = this.re * z.im + this.im * z.re
    // When this.im = 0 and z.im = 0: im = this.re * 0 + 0 * z.re
    //
    // For finite non-zero re values: finite * 0 = 0 exactly. Same result.
    // For Infinity re: Infinity * 0 = NaN. But Infinity re means isInfinite() fires first.
    //
    // What if re is finite but im is a very small non-zero number that rounds to 0?
    // No - we need im to be exactly 0 to hit the optimization condition.
    //
    // What if we use Number.MIN_VALUE for im? Then im !== 0, condition is false for both.
    //
    // I need to find finite re values where this.re * 0 + 0 * z.re != 0.
    // That's impossible for finite values since finite * 0 = 0 exactly.
    //
    // CONCLUSION: The mutation is mathematically equivalent for all valid inputs.
    // The only difference would be with Infinity, but that's caught earlier.
    //
    // Let me try a completely different approach: test the behavior when
    // this.im is exactly 0 (as a number) vs when it might be treated differently.
    // 
    // Actually - what if I create a Complex number where the im property
    // is 0 but z.im is also 0, and check that the result's im is exactly 0
    // (not -0 or NaN)?
    //
    // For negative real numbers:
    // this.re = -5, this.im = 0, z.re = -3, z.im = 0
    // General formula: im = (-5)*0 + 0*(-3) = -0 + (-0)
    // In IEEE 754: -0 + -0 = -0
    // Optimization: im = 0 (literal positive zero)
    //
    // But 0 + (-0) = 0 in IEEE 754... let me check -0 + -0:
    // -0 + -0 = -0 in IEEE 754!
    //
    // So for negative real * negative real:
    // General formula im = (-5)*0 + 0*(-3) = (-0) + (-0) = -0
    // Optimization im = 0 (positive zero)
    //
    // Object.is(-0, 0) is FALSE!
    // But previous -0 tests passed on mutated... let me verify the arithmetic.
    // (-5) * 0: negative * positive zero = negative zero = -0 ✓
    // 0 * (-3): positive zero * negative = negative zero = -0 ✓  
    // (-0) + (-0) = -0 ✓
    //
    // So result.im should be -0 in mutated code for (-5, 0) * (-3, 0)
    // But Object.is(result.im, 0) should be false for -0...
    // Previous tests showed this passed on mutated too. Why?
    //
    // Maybe the mutated code DOES take the optimization because this[""] === 0?
    // If Complex.prototype has a "" property that equals 0...
    // Let me check: Complex.prototype = { 're': 0, 'im': 0, ... }
    // No "" key. So this[""] is undefined.
    //
    // OR maybe the test runner normalizes -0 to 0 somehow.
    // Let me use a more explicit check.
    
    const a = new Complex(-5, 0);
    const b = new Complex(-3, 0);
    const result = a.mul(b);
    
    // Use 1/x to distinguish +0 from -0
    // 1/(+0) = +Infinity, 1/(-0) = -Infinity
    const sign = 1 / result.im;
    expect(sign).toBe(Infinity); // +Infinity means im is +0 (optimization path taken)
  });
});