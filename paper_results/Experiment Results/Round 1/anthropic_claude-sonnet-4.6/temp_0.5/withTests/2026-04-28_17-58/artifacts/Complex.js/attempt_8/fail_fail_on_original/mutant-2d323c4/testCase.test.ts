import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acsch', () => {
  it('acsch(2+3i) gives the correct value matching the first branch computation', () => {
    const c = new Complex(2, 3);
    const result = c.acsch();
    // d = 4 - 9 = -5, both branches use first branch
    // Complex(2/(-5), -3/(-5)).asinh() = Complex(-0.4, 0.6).asinh()
    const expected = new Complex(-0.4, 0.6).asinh();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});