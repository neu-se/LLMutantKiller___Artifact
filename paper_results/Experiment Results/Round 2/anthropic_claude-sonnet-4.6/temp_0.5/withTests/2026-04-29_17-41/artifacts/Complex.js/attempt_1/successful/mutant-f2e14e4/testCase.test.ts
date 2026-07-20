import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot', () => {
  it('should compute acot(0 + 0.5i) correctly', () => {
    const z = new Complex(0, 0.5);
    const result = z.acot();
    // acot(z) = atan(1/z), 1/(0+0.5i) = -2i
    // atan(-2i) = i/2 * log((i - 2i)/(i + 2i)) = i/2 * log(-i/3i) = i/2 * log(-1/3)
    const inv = z.inverse();
    const expected = inv.atan();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});