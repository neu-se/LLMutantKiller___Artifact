import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return Infinity when subtracting an infinite complex number from another infinite complex number', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 0);
    const c3 = new Complex(Infinity, Infinity);
    expect(c3.sub(c2).toString()).toBe('Infinity');
    expect(c1.sub(c3).toString()).toBe('NaN');
  });
});