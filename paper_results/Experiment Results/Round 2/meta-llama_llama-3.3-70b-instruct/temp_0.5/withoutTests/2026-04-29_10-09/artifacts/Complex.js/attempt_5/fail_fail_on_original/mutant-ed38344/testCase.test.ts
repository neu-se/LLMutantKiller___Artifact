import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return NaN when subtracting two infinite complex numbers and not return Infinity when one is infinite and the other is not', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    const c3 = new Complex(1, 0);
    expect(c1.sub(c2).toString()).toBe('NaN');
    expect(c1.sub(c3).toString()).toBe('Infinity');
  });
});