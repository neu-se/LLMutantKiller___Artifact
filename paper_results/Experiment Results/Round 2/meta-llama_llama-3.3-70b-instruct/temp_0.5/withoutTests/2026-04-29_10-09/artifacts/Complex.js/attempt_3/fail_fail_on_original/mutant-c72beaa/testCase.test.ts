import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate acot for a complex number with a non-zero real part', () => {
    const complex = new Complex(1, 0);
    const result = complex.acot();
    const expected = new Complex(0, -Math.PI / 2);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});