import { Complex } from '../complex.js';

describe('Complex', () => {
  it('should not return Infinity when subtracting two infinite complex numbers', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    expect(c1.sub(c2).toString()).not.toBe('Infinity');
  });
});