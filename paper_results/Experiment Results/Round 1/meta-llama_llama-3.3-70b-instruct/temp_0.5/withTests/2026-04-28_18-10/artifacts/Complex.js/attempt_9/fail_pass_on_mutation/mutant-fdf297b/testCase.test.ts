import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly handle subtraction of two infinite complex numbers', () => {
    const c1 = new Complex(Infinity, 0);
    const c2 = new Complex(Infinity, 0);
    expect(c1.sub(c2).isInfinite()).toBe(false);
    const c3 = new Complex(Infinity, Infinity);
    const c4 = new Complex(Infinity, Infinity);
    expect(c3.sub(c4).isNaN()).toBe(true);
  });
});