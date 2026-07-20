import { Complex } from '../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly handle subtraction of an infinite complex number from a finite complex number', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 2);
    expect(c1.sub(c2).isInfinite()).toBe(true);
    const c3 = new Complex(Infinity, Infinity);
    expect(c3.sub(c2).isInfinite()).toBe(true);
    const c4 = new Complex(1, 2);
    expect(c1.sub(c4).isInfinite()).toBe(true);
  });
});