import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return NaN when subtracting two infinite complex numbers and not return Infinity when both are infinite', () => {
    const c1 = new Complex(Infinity, Infinity);
    const c2 = new Complex(Infinity, Infinity);
    expect(c1.sub(c2).toString()).toBe('NaN');
  });
});