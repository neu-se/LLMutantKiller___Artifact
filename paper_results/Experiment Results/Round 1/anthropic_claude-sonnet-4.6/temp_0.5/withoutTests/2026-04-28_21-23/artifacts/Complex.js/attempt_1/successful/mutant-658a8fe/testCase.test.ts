import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a complex number with non-zero imaginary part", () => {
    // For a complex number with both real and imaginary parts non-zero,
    // acsch should return a finite complex number.
    // The mutation changes `d !== 0` to `d === 0`, which inverts the branch logic.
    // With the original code: d = a*a + b*b (note: there's a bug in the source: a/a + b*b, but let's test behavior)
    // We need a case where d != 0 (which is most cases) to expose the mutation.
    
    const c = new Complex(1, 1);
    const result = c.acsch();
    
    // acsch(1 + i) should be a finite complex number
    // The real part should be approximately 0.5306375...
    // The imaginary part should be approximately -0.4522784...
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(result.re).toBeCloseTo(0.5306375309525178, 5);
    expect(result.im).toBeCloseTo(-0.45227844715119064, 5);
  });
});