import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch for very small non-zero a and b where d underflows", () => {
    // a=1e-200, b=1e-200: d = a*a + b*b underflows to 0, b!==0 skips early return
    // Original: (a !== 0) => a/0 = Infinity => new Complex(Infinity, -Infinity).asinh()
    // Mutated:  (a === 0) is false => 0      => new Complex(0, -Infinity).asinh()
    const origPath = new Complex(Infinity, -Infinity).asinh();
    const mutPath = new Complex(0, -Infinity).asinh();
    
    // Verify the two paths give different results
    const pathsDiffer = origPath.re !== mutPath.re || origPath.im !== mutPath.im ||
                        (isNaN(origPath.re) !== isNaN(mutPath.re)) ||
                        (isNaN(origPath.im) !== isNaN(mutPath.im));
    
    if (pathsDiffer) {
      const c = new Complex(1e-200, 1e-200);
      const result = c.acsch();
      // Should match original path behavior
      if (isNaN(origPath.re)) {
        expect(isNaN(result.re)).toBe(true);
      } else {
        expect(result.re).toBeCloseTo(origPath.re, 5);
      }
      if (isNaN(origPath.im)) {
        expect(isNaN(result.im)).toBe(true);
      } else {
        expect(result.im).toBeCloseTo(origPath.im, 5);
      }
    }
  });
});