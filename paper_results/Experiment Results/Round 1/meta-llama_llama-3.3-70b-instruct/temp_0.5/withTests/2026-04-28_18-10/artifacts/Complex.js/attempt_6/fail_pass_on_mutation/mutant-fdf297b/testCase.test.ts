import { Complex } from '../../../../../../../../../../../subject_repositories/Complex.js/complex.js';

describe('Complex', () => {
  it('should correctly handle subtraction of two infinite complex numbers with different imaginary parts', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, 0);
    expect(c1.sub(c2).isInfinite()).toBe(false);
  });
});