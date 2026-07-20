import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly handle subtraction of an infinite complex number and another infinite complex number', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, 0);
    expect(c1.sub(c2).isInfinite()).toBe(true);
    expect(c1.sub(c2).isNaN()).toBe(false);
  });
});