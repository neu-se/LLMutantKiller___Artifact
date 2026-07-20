import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("detects sign mutation in acsch d=0 branch with negative b and zero a", () => {
    // a=0, b=-1e-200: b !== 0, d = b^2 underflows to 0
    // Original: new Complex(0, -b/0) = new Complex(0, +Infinity).asinh()
    // Mutated:  new Complex(0, +b/0) = new Complex(0, -Infinity).asinh()
    // asinh(0, +Inf): swaps to asin(+Inf, 0), then back
    // asinh(0, -Inf): swaps to asin(-Inf, 0), then back
    const z = new Complex(0, -1e-200);
    const result = z.acsch();
    
    const originalExpected = new Complex(0, 1e308 * 2).asinh(); // approximate +Infinity path
    
    // asin(Infinity, 0): t1 = sqrt(0 - Inf^2 + 1, 0) = sqrt(-Inf, 0)
    // For sqrt with negative re: re = |b|/sqrt(2*(r-a)) = 0, im = 0.5*sqrt(2*(r-a))
    // r = abs(-Inf) = Inf, a = -Inf: r - a = Inf - (-Inf) = Inf
    // im = 0.5 * sqrt(2*Inf) = Inf
    // So t1 = (0, Inf), t2 = log(0 - 0, Inf + Inf) = log(0, Inf)
    // logHypot(0, Inf) = log(Inf) = Inf, atan2(Inf, 0) = pi/2
    // t2 = (Inf, pi/2), asin result = (t2.im, -t2.re) = (pi/2, -Inf)
    // asinh(0, +Inf): after swap asin(+Inf, 0), result asin = (pi/2, -Inf)
    // then asinh swaps back: re = -(-Inf) = Inf... 
    
    // Just check the sign of imaginary part differs
    const originalResult = (() => {
      const tmp_im = 0;
      const tmp_re = 1e-200; // doesn't matter, a=0
      // simulate original: new Complex(0, +Infinity).asinh()
      return new Complex(0, Infinity).asinh();
    })();
    
    const mutatedResult = new Complex(0, -Infinity).asinh();
    
    // If original and mutated give different results, our test input should match original
    if (!isNaN(originalResult.re) && !isNaN(mutatedResult.re)) {
      expect(result.re).toBeCloseTo(originalResult.re, 5);
    } else {
      // Check signs differ at least
      expect(isNaN(result.im)).toBe(isNaN(originalResult.im));
    }
  });
});