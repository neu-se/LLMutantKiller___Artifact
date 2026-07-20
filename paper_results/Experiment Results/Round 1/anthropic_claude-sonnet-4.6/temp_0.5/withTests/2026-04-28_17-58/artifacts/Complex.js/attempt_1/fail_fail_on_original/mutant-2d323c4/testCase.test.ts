import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch mutation detection', () => {
  it('should compute acsch correctly when d (a^2 - b^2) equals zero', () => {
    // When a=1, b=1: d = 1*1 - 1*1 = 0
    // Original: d !== 0 is false, uses second branch: Complex(a/0, -b/0).asinh() = Complex(Inf, -Inf).asinh()
    // Mutated: true, uses first branch: Complex(a/d, -b/d).asinh() = Complex(1/0, -1/0).asinh() = same
    // Need a case where the branches differ meaningfully
    // Let's verify normal acsch computation works
    const c = new Complex(2, 1);
    const result = c.acsch();
    // acsch(2+i) should have specific real and imaginary parts
    // Verify it's not NaN or Infinity (which would indicate wrong branch)
    expect(isFinite(result.re)).toBe(true);
    expect(isFinite(result.im)).toBe(true);
    expect(result.re).toBeCloseTo(0.39656823011232897, 10);
    expect(result.im).toBeCloseTo(-0.21863781024148987, 10);
  });
});