import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should correctly handle subtraction of a finite complex number from an infinite complex number', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 2);
    expect(c1.sub(c2).isInfinite()).toBe(true);
  });
});