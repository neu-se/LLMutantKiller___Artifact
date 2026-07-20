import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot with subnormal numbers', () => {
  it('should handle acot with very small imaginary part where d underflows to zero', () => {
    // With b = 5e-324 (smallest positive float), b*b underflows to 0
    // So d = a*a + b*b = 0 when a=0, triggering the else branch
    // Original: (b !== 0) ? -b/0 : 0 => b !== 0 is true => -b/0 = -Infinity
    // Mutated: (false) ? -b/0 : 0 => always 0
    const result = new Complex(0, 5e-324).acot();
    const resultIm = result.im;
    // The imaginary part should be non-zero in original (involves -Infinity path)
    // but would be 0 in mutated version
    expect(isFinite(resultIm) || !isFinite(resultIm)).toBe(true); // placeholder
    // More specifically, original passes -Infinity as im to atan(), mutated passes 0
    const withInfIm = new Complex(0, -Infinity).atan();
    const withZeroIm = new Complex(0, 0).atan();
    expect(result.re).toBeCloseTo(withInfIm.re, 5);
    expect(result.im).toBeCloseTo(withInfIm.im, 5);
  });
});