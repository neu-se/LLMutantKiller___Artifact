import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow with zero base", () => {
  it("should handle 0^(0+i) correctly - not return ZERO when exponent real part is 0", () => {
    const result = new Complex(0, 0).pow(new Complex(0, 1));
    // Original: z['re'] > 0 fails (0 is not > 0), falls through to general formula
    // Mutated: z['re'] >= 0 succeeds, returns Complex['ZERO']
    // The general formula with logHypot(0,0) = -Infinity gives NaN results
    // Let's check what the original actually produces vs mutated
    expect(result.re).toBeNaN();
    expect(result.im).toBeNaN();
  });
});