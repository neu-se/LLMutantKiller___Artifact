import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate acot for a complex number with a non-zero real part and zero imaginary part', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    const expected = new Complex(0.7853981633974483, 0);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
    const complex2 = new Complex(1, 1);
    const result2 = complex2.acot();
    expect(result2.re).not.toBeCloseTo(0, 10);
  });
});