import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly calculate acot for a complex number with a very large real part and a very small imaginary part', () => {
    const complex = new Complex(1e308, 1e-323);
    const result = complex.acot();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
    const complex2 = new Complex(1e-323, 1e308);
    const result2 = complex2.acot();
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});