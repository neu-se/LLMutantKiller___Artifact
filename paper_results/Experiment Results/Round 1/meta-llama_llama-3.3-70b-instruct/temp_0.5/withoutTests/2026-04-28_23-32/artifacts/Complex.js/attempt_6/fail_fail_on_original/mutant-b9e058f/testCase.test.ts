import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should handle addition of two complex numbers correctly', () => {
    const c1 = new Complex(1, 1);
    const c2 = new Complex(Infinity, Infinity);
    expect(c1.add(c2).equals(Complex['INFINITY'])).toBe(true);
    const c3 = new Complex(Infinity, Infinity);
    const c4 = new Complex(Infinity, Infinity);
    expect(c3.add(c4).equals(Complex['NAN'])).toBe(true);
  });
});