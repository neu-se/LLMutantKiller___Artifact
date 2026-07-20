import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acot', () => {
  it('should correctly compute acot for a complex number with non-zero real and imaginary parts', () => {
    const c = new Complex(1, 1);
    const result = c.acot();
    // acot(1+i) = atan(1/(1+i)) = atan((1-i)/2)
    const expected = new Complex(1, 1).inverse().atan();
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});