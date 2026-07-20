import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch result for tiny positive real and tiny positive imaginary matches original sign convention", () => {
    // For a=1e-200, b=1e-200: d = 2e-400 = 0 (underflow), a!= 0, b != 0
    // Original: new Complex(a/0, -b/0).asinh() = new Complex(+Inf, -Inf).asinh()
    // Mutated:  new Complex(a/0, +b/0).asinh() = new Complex(+Inf, +Inf).asinh()
    
    // Trace asinh(+Inf, -Inf):
    //   tmp = -Inf, im = -Inf, re = -Inf => asin(-Inf, -Inf)
    // Trace asinh(+Inf, +Inf):
    //   tmp = +Inf, im = -Inf, re = +Inf => asin(+Inf, -Inf)
    
    const orig = new Complex(Infinity, -Infinity).asinh();
    const mutd = new Complex(Infinity, Infinity).asinh();
    
    // Check if they differ - if so use that to detect mutation
    const z = new Complex(1e-200, 1e-200);
    const result = z.acsch();
    
    // result should equal orig (original code path)
    // Use isNaN check since both might be NaN but with different signs potentially
    if (isNaN(orig.re) !== isNaN(mutd.re) || isNaN(orig.im) !== isNaN(mutd.im)) {
      expect(isNaN(result.re)).toBe(isNaN(orig.re));
      expect(isNaN(result.im)).toBe(isNaN(orig.im));
    } else if (orig.re !== mutd.re || orig.im !== mutd.im) {
      expect(result.re).toBe(orig.re);
      expect(result.im).toBe(orig.im);
    } else {
      // They're the same - try negative b
      const orig2 = new Complex(Infinity, Infinity).asinh(); // a=1e-200, b=-1e-200 original: -b/0 = +Inf
      const mutd2 = new Complex(Infinity, -Infinity).asinh(); // mutated: +b/0 = -Inf
      const z2 = new Complex(1e-200, -1e-200);
      const result2 = z2.acsch();
      expect(result2.re).toBe(orig2.re);
      expect(result2.im).toBe(orig2.im);
    }
  });
});