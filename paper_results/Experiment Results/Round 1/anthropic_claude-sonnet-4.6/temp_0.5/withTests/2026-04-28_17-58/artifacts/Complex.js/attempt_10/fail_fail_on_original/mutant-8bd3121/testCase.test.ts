import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch with imaginary input", () => {
  it("acsch should correctly handle purely imaginary input", () => {
    // acsch(0 + 2i): a=0, b=2
    // d = 0 + 4 = 4, new Complex(0, -2/4).asin() = new Complex(0, -0.5).asin()
    // With b=0 (mutated): d = 0, takes else branch with a/0 = NaN
    const c = new Complex(0, 2);
    const result = c.acsch();
    
    // acsch(2i) = asin(-i/2) ... should be a valid number
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
    
    // The imaginary part should be non-zero
    expect(Math.abs(result.re)).toBeGreaterThan(1e-10);
  });
});