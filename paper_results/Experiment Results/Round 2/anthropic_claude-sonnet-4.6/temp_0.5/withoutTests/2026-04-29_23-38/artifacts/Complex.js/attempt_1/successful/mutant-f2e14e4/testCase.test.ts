import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acot mutation test', () => {
  it('should compute acot correctly for complex number with non-zero imaginary part', () => {
    // acot(z) = atan(1/z), test with z = 1+i
    const z = new Complex(1, 1);
    const result = z.acot();
    // acot(1+i) = atan(1/(1+i)) = atan((1-i)/2)
    const expected = new Complex(1, 1).inverse().atan();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});