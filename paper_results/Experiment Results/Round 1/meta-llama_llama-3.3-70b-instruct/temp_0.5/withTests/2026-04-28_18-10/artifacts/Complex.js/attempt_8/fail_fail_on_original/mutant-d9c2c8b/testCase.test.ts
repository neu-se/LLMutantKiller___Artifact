import { Complex } from '../../complex.js';

describe('Complex.js', () => {
  it('should correctly calculate the atanh of a complex number', () => {
    const complex = new Complex(0.5, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0.5493061443340548, 10);
    expect(result.im).toBeCloseTo(0, 10);
    // The mutant code has x['im'] = Math.atan2(x['im'], temp) * 2, 
    // which should cause the result to be different from the expected value
    // when the input is a complex number with a non-zero imaginary part
    const complex2 = new Complex(0.5, 0.5);
    const result2 = complex2.atanh();
    expect(result2.re).not.toBeCloseTo(0.5493061443340548, 10);
  });
});