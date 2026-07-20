import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe('Complex acot mutation test', () => {
  it('should compute acot correctly for complex number with non-zero imaginary part', () => {
    // For a complex number with im !== 0, we reach the mutated line
    // acot(0 + 2i): b = 2, a = undefined (bug in source), d = NaN
    // Original: d !== 0 → NaN !== 0 → true → first branch
    // Mutated: d === 0 → NaN === 0 → false → second branch
    // Let's use asec as reference since it has the same structure but correct 're' access
    const z = new Complex(2, 1);
    const result = z.acot();
    // acot(z) = atan(1/z), so we can verify against atan of inverse
    const expected = z.inverse().atan();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});