import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should handle NaN values correctly', () => {
    const complex1 = new Complex(NaN, 1);
    expect(complex1.re).toBeNaN();
    expect(complex1.im).toBe(1);
    const complex2 = new Complex(NaN, NaN);
    expect(complex2).toEqual(Complex.NAN);
  });
});