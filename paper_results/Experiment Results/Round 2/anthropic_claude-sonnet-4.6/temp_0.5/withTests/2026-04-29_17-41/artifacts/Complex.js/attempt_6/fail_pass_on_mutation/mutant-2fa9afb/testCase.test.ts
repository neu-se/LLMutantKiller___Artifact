import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth', () => {
  it('should correctly compute acoth(2) which is not (0, pi/2)', () => {
    const result = new Complex(2, 0).acoth();
    // acoth(2) = atanh(1/2) = 0.5 * ln(3) ≈ 0.5493
    expect(result.re).toBeCloseTo(0.5493, 3);
    expect(result.im).toBeCloseTo(0, 10);
  });
});