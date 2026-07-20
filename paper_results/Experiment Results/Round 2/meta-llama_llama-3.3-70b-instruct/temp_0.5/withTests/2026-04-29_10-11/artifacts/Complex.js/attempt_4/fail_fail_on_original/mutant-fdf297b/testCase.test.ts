import { Complex } from '../../../complex.js';

describe('Complex', () => {
  it('should correctly handle subtraction of an infinite complex number from another infinite complex number', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    expect(c1.sub(c2).isNaN()).toBe(true);
  });
});