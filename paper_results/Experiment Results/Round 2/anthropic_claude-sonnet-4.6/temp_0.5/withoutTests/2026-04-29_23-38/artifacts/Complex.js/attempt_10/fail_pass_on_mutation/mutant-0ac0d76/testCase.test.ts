import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow", () => {
  it("positive real base with real exponent should have exactly zero imaginary part", () => {
    // Original: a=4>0, b=0 -> Math.pow(4, 0.5) = 2, im = 0 exactly
    // Mutated: a<=0 false for a=4, falls to general formula
    // General formula: b = z['im']*loh + z['re']*arg = 0*loh + 0.5*atan2(0,4) = 0
    // Hmm atan2(0,4) = 0, so b=0, sin(0)=0... same result
    const result = new Complex(4, 0).pow(new Complex(0.5, 0));
    expect(result.re).toBeCloseTo(2, 10);
    expect(result.im).toBe(0);
  });
});