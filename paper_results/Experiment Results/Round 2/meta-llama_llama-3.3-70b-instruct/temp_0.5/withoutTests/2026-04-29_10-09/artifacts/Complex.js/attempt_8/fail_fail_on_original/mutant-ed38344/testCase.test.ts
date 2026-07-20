import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should return NaN when subtracting two infinite complex numbers and not return Infinity when both are infinite', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(1, 0);
    const c3 = new Complex(Infinity, Infinity);
    expect(c1.sub(c2).toString()).toBe('Infinity');
    expect(c3.sub(c2).toString()).toBe('Infinity');
    expect(c1.sub(c3).toString()).toBe('NaN');
  });
});