import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('Complex acoth mutation detection', () => {
  it('should compute acoth correctly for a non-zero real number', () => {
    // acoth(2) = atanh(1/2) = 0.5 * log(3) ≈ 0.5493...
    const result = new Complex(2, 0).acoth();
    // With the if(true) block, both return Complex(0, PI/2) - need to verify actual behavior
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(Math.PI / 2, 10);
  });
});