import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("should not produce NaN when raising 0+0i to a positive real power", () => {
    // Original code: condition is z.im >= 0, so when base=0+0i and exponent=2+0i,
    // it enters the block and returns Complex.ZERO (not NaN).
    // Mutated code: condition is z.im > 0, so when z.im === 0 it skips the block,
    // falls through to logHypot(0,0) = -Infinity, producing NaN result.
    const base = new Complex(0, 0);
    const result = base.pow(new Complex(2, 0));
    
    expect(result.isNaN()).toBe(false);
  });
});