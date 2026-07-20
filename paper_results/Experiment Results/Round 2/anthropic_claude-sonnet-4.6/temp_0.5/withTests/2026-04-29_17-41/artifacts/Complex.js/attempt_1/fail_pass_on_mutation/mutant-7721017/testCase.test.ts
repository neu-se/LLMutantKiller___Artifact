import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow mutation detection", () => {
  it("should correctly compute pow of a purely imaginary base with a positive real exponent", () => {
    // (0 + 2i)^2 = -4 + 0i
    // Original: a=0, b=2 (b !== 0), so does NOT return ZERO, computes correctly
    // Mutated: a=0, true, z.re=2>0, z.im=0>=0, so returns ZERO incorrectly
    const result = new Complex(0, 2).pow(new Complex(2, 0));
    
    expect(result.re).toBeCloseTo(-4, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});