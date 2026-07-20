import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow mutation detection", () => {
  it("should correctly compute i^1 as i, not 0", () => {
    // base: i (a=0, b=1), exponent: 1 (z.re=1, z.im=0)
    // Original: (a===0 && b===0) is false since b=1, computes normally -> i
    // Mutated: (a===0 && true && 1>0 && 0>=0) is true, returns ZERO -> 0
    const base = new Complex(0, 1); // i
    const result = base.pow(new Complex(1, 0));
    
    // i^1 = i, so im should be ~1
    expect(result.im).toBeCloseTo(1, 10);
  });
});