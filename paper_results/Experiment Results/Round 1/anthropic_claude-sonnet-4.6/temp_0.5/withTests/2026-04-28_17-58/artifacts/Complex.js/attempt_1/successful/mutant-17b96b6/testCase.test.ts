import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe('acoth mutation detection', () => {
  it('should return correct acoth value for non-zero real input', () => {
    // acoth(2) = atanh(1/2) ≈ 0.5493061443340548 + 0i
    // With mutation (if true), it always returns Complex(0, PI/2) ≈ Complex(0, 1.5707...)
    const result = new Complex(2, 0).acoth();
    
    // The real part should be approximately 0.5493, not 0
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    // The imaginary part should be 0, not PI/2
    expect(result.im).toBeCloseTo(0, 10);
  });
});