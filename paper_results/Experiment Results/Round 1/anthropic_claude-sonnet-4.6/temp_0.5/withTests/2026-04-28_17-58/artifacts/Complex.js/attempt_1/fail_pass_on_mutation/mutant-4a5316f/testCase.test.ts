import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth mutation test', () => {
  it('should compute acoth(0 + 2i) correctly with negative imaginary part', () => {
    const result = new Complex(0, 2).acoth();
    // acoth(2i) = atanh(2i / (4)) = atanh(-2i/4) = atanh(-i/2)
    // Expected: re=0, im = -atan(1/2) / ... let me compute properly
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.atan(0.5), 10);
  });
});