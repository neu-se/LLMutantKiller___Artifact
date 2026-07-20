import { Complex } from '../complex';

describe('Complex', () => {
  it('should correctly handle subtraction of an infinite complex number from a finite complex number and then from another infinite complex number', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 2);
    const c3 = new Complex(Infinity, Infinity);
    expect(c1.sub(c2).isInfinite()).toBe(true);
    expect(c3.sub(c1).isNaN()).toBe(true);
  });
});